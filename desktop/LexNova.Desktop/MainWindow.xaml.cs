using System.IO;
using System.Text.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text;
using System.Windows;
using Microsoft.Win32;
using Microsoft.Web.WebView2.Core;

namespace LexNova.Desktop;

public partial class MainWindow : Window
{
    private const string AppHost = "appassets.example";
    private readonly string appFolder = Path.Combine(AppContext.BaseDirectory, "Web");
    private readonly string aiKeyPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "LexNova", "xai-key.bin");
    private static readonly HttpClient Http = new() { Timeout = TimeSpan.FromSeconds(120) };

    public MainWindow()
    {
        InitializeComponent();
        Loaded += async (_, _) => await OpenAppAsync();
    }

    private async Task OpenAppAsync()
    {
        ErrorPanel.Visibility = Visibility.Collapsed;
        try
        {
            if (!File.Exists(Path.Combine(appFolder, "index.html")))
            {
                ErrorPanel.Visibility = Visibility.Visible;
                return;
            }
            await Browser.EnsureCoreWebView2Async();
            Browser.CoreWebView2.SetVirtualHostNameToFolderMapping(
                AppHost,
                appFolder,
                CoreWebView2HostResourceAccessKind.DenyCors);
            Browser.CoreWebView2.NavigationStarting += (_, e) =>
            {
                if (!Uri.TryCreate(e.Uri, UriKind.Absolute, out var target) ||
                    !string.Equals(target.Host, AppHost, StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(target.AbsolutePath, "/index.html", StringComparison.OrdinalIgnoreCase))
                {
                    return;
                }

                e.Cancel = true;
                Browser.CoreWebView2.Navigate(DesktopUri(target.PathAndQuery + target.Fragment).ToString());
            };
            Browser.CoreWebView2.NavigationCompleted += NavigationCompleted;
            Browser.CoreWebView2.WebMessageReceived += WebMessageReceived;
            Browser.CoreWebView2.Navigate(DesktopUri("/").ToString());
        }
        catch
        {
            ErrorPanel.Visibility = Visibility.Visible;
        }
    }

    private void WebMessageReceived(object? sender, CoreWebView2WebMessageReceivedEventArgs e)
    {
        if (!Uri.TryCreate(e.Source, UriKind.Absolute, out var source) ||
            !string.Equals(source.Host, AppHost, StringComparison.OrdinalIgnoreCase)) return;

        try
        {
            using var message = JsonDocument.Parse(e.WebMessageAsJson);
            var root = message.RootElement;
            if (!root.TryGetProperty("requestId", out var requestElement) || requestElement.ValueKind != JsonValueKind.String) return;
            var requestId = requestElement.GetString();
            if (string.IsNullOrWhiteSpace(requestId)) return;
            var type = root.GetProperty("type").GetString();
            if (type is "pick-files" or "pick-backup" or "save-backup" or "save-ai-key" or "delete-ai-key" or "get-ai-status" or "test-ai" or "ask-ai")
            {
                var request = root.Clone();
                Dispatcher.BeginInvoke(new Action(() => HandleFileRequest(type, requestId, request)));
            }
        }
        catch
        {
            Browser.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = "file-operation-error" }));
        }
    }

    private async void HandleFileRequest(string? type, string requestId, JsonElement message)
    {
        try
        {
            if (type == "pick-files")
            {
                var picker = new OpenFileDialog { Title = "انتخاب پیوست", Filter = "همهٔ فایل‌ها (*.*)|*.*", Multiselect = true, CheckFileExists = true };
                var result = picker.ShowDialog(this);
                if (result != true)
                {
                    Browser.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = "files-selected", requestId, files = Array.Empty<object>() }));
                    return;
                }
                var files = picker.FileNames.Select(path =>
                {
                    var info = new FileInfo(path);
                    if (info.Length > 20 * 1024 * 1024) throw new InvalidOperationException($"حجم فایل {info.Name} بیشتر از ۲۰ مگابایت است.");
                    var bytes = File.ReadAllBytes(path);
                    return new { id = Guid.NewGuid().ToString("N"), name = info.Name, size = bytes.LongLength, type = MimeType(path), base64 = Convert.ToBase64String(bytes) };
                }).ToArray();
                Browser.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = "files-selected", requestId, files }));
            }
            else if (type == "pick-backup")
            {
                var picker = new OpenFileDialog { Title = "انتخاب فایل پشتیبان Lex Nova", Filter = "پشتیبان Lex Nova (*.json)|*.json|همهٔ فایل‌ها (*.*)|*.*", CheckFileExists = true };
                if (picker.ShowDialog(this) != true) return;
                var content = File.ReadAllText(picker.FileName);
                Browser.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = "backup-selected", requestId, content }));
            }
            else if (type == "save-backup")
            {
                var content = message.GetProperty("content").GetString() ?? "";
                var picker = new SaveFileDialog { Title = "ذخیره نسخه پشتیبان Lex Nova", Filter = "پشتیبان Lex Nova (*.json)|*.json", FileName = $"lex-nova-backup-{DateTime.Now:yyyy-MM-dd}.json", DefaultExt = ".json", AddExtension = true };
                if (picker.ShowDialog(this) == true)
                {
                    File.WriteAllText(picker.FileName, content, new UTF8Encoding(false));
                    Browser.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = "backup-saved", requestId }));
                }
            }
            else if (type == "save-ai-key")
            {
                var key = message.GetProperty("key").GetString()?.Trim() ?? "";
                if (key.Length < 20 || key.Length > 500) throw new InvalidOperationException("کلید API معتبر نیست.");
                Directory.CreateDirectory(Path.GetDirectoryName(aiKeyPath)!);
                var encrypted = ProtectedData.Protect(Encoding.UTF8.GetBytes(key), null, DataProtectionScope.CurrentUser);
                File.WriteAllBytes(aiKeyPath, encrypted);
                Browser.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = "ai-key-saved", requestId }));
            }
            else if (type == "delete-ai-key")
            {
                if (File.Exists(aiKeyPath)) File.Delete(aiKeyPath);
                Browser.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = "ai-key-deleted", requestId }));
            }
            else if (type == "get-ai-status")
            {
                Browser.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = "ai-key-status", requestId, configured = File.Exists(aiKeyPath) }));
            }
            else if (type == "test-ai")
            {
                var result = await CallAiAsync("در یک جمله کوتاه فقط بگو اتصال برقرار است.", "آزمون اتصال", "");
                Browser.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = "ai-test-result", requestId, ok = result.Ok, error = result.Error }));
            }
            else if (type == "ask-ai")
            {
                var query = message.GetProperty("query").GetString() ?? "";
                var brief = message.GetProperty("officeBrief").GetString() ?? "";
                var history = message.GetProperty("messages").EnumerateArray()
                    .TakeLast(8).Select(item => $"{item.GetProperty("role").GetString()}: {item.GetProperty("content").GetString()}");
                var sources = message.GetProperty("sources").EnumerateArray().Select(item => new
                {
                    id = item.GetProperty("id").GetString() ?? "",
                    title = item.GetProperty("title").GetString() ?? "",
                    article = item.GetProperty("article").GetString() ?? "",
                    summary = item.GetProperty("summary").GetString() ?? ""
                }).ToArray();
                var sourceBlock = string.Join("\n", sources.Select(source => $"{source.article} | {source.title}: {source.summary}"));
                var result = await CallAiAsync(query, brief, string.Join("\n", history), sourceBlock);
                if (result.Ok)
                    Browser.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = "ai-response", requestId, ok = true, text = result.Text, citations = sources }));
                else
                    Browser.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = "ai-response", requestId, ok = false, text = (string?)null, error = result.Error }));
            }
        }
        catch (Exception exception)
        {
            Browser.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = type?.Contains("ai") == true || type == "save-ai-key" ? "ai-operation-error" : "file-operation-error", requestId, error = exception.Message }));
        }
    }

    private async Task<(bool Ok, string? Text, string? Error)> CallAiAsync(string query, string officeBrief, string history, string sources = "")
    {
        if (!File.Exists(aiKeyPath)) return (false, null, "کلید API در تنظیمات دسکتاپ ثبت نشده است.");
        var key = Encoding.UTF8.GetString(ProtectedData.Unprotect(File.ReadAllBytes(aiKeyPath), null, DataProtectionScope.CurrentUser));
        using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.x.ai/v1/responses");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", key);
        request.Content = JsonContent.Create(new
        {
            model = "grok-4.7",
            input = $"نقش: دستیار حقوقی ایران. پاسخ فارسی رسمی بده. فقط به مواد و منابع زیر استناد کن و اگر منبع کافی نیست صریح بگو و حدس نزن. این پاسخ جایگزین وکیل نیست؛ در پایان هشدار بازبینی درج کن.\n\nمنابع حقوقی محلی مرتبط:\n{sources}\n\nخلاصه اطلاعات دفتر:\n{officeBrief[..Math.Min(officeBrief.Length, 10000)]}\n\nگفتگوی اخیر:\n{history[..Math.Min(history.Length, 8000)]}\n\nپرسش/درخواست:\n{query[..Math.Min(query.Length, 4000)]}",
            max_output_tokens = 1200,
            reasoning = new { effort = "low" },
            store = false
        });
        using var response = await Http.SendAsync(request);
        var body = await response.Content.ReadAsStringAsync();
        if (!response.IsSuccessStatusCode) return (false, null, $"خطای سرویس AI ({(int)response.StatusCode}). کلید، اعتبار حساب و اتصال اینترنت را بررسی کنید.");
        using var json = JsonDocument.Parse(body);
        var text = json.RootElement.TryGetProperty("output_text", out var output) ? output.GetString() : null;
        if (string.IsNullOrWhiteSpace(text))
        {
            var pieces = new List<string>();
            if (json.RootElement.TryGetProperty("output", out var items))
                foreach (var item in items.EnumerateArray())
                    if (item.TryGetProperty("content", out var content))
                        foreach (var part in content.EnumerateArray())
                            if (part.TryGetProperty("text", out var value)) pieces.Add(value.GetString() ?? "");
            text = string.Join("\n", pieces).Trim();
        }
        return string.IsNullOrWhiteSpace(text) ? (false, null, "پاسخ خالی از سرویس دریافت شد.") : (true, text, null);
    }

    private static string MimeType(string path) => Path.GetExtension(path).ToLowerInvariant() switch
    {
        ".png" => "image/png", ".jpg" or ".jpeg" => "image/jpeg", ".pdf" => "application/pdf",
        ".doc" => "application/msword", ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ".xls" => "application/vnd.ms-excel", ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ".txt" => "text/plain", _ => "application/octet-stream"
    };

    private void NavigationCompleted(object? sender, CoreWebView2NavigationCompletedEventArgs e)
    {
        ErrorPanel.Visibility = e.IsSuccess ? Visibility.Collapsed : Visibility.Visible;
    }

    private Uri DesktopUri(string route)
    {
        return new Uri($"https://{AppHost}/index.html?route={Uri.EscapeDataString(route)}");
    }

    private void Refresh_Click(object sender, RoutedEventArgs e) => Browser.Reload();

    private async void Retry_Click(object sender, RoutedEventArgs e) => await OpenAppAsync();
}
