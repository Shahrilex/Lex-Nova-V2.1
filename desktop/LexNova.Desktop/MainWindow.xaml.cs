using System.IO;
using System.Windows;
using Microsoft.Web.WebView2.Core;

namespace LexNova.Desktop;

public partial class MainWindow : Window
{
    private const string AppHost = "appassets.example";
    private readonly string appFolder = Path.Combine(AppContext.BaseDirectory, "Web");

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
            Browser.CoreWebView2.Navigate(DesktopUri("/").ToString());
        }
        catch
        {
            ErrorPanel.Visibility = Visibility.Visible;
        }
    }

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
