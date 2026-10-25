import { createFileRoute } from "@tanstack/react-router";
import { Bot, Database, Download, HardDriveUpload, MonitorDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { PageHeader, Surface } from "@/components/PageHeader";
import { planLabel } from "@/lib/seed";
import { useApp } from "@/lib/store";
import { toFaDigits } from "@/lib/utils";
import { BACKUP_VERSION, isLexNovaBackup, type LexNovaBackup } from "@/lib/backup";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const user = useApp((s) => s.user);
  const office = useApp((s) => s.office);
  const clients = useApp((s) => s.clients);
  const cases = useApp((s) => s.cases);
  const resetDemo = useApp((s) => s.resetDemo);
  const updateOffice = useApp((s) => s.updateOffice);
  const restoreBackup = useApp((s) => s.restoreBackup);
  const parties = useApp((s) => s.parties);
  const deadlines = useApp((s) => s.deadlines);
  const timeline = useApp((s) => s.timeline);
  const documents = useApp((s) => s.documents);
  const notes = useApp((s) => s.notes);
  const transactions = useApp((s) => s.transactions);
  const petitions = useApp((s) => s.petitions);
  const hearings = useApp((s) => s.hearings);
  const members = useApp((s) => s.members);
  const notices = useApp((s) => s.notices);
  const chat = useApp((s) => s.chat);
  const backupInput = useRef<HTMLInputElement>(null);
  const backupRequest = useRef("");
  const aiRequest = useRef("");
  const [aiKey, setAiKey] = useState("");
  const [aiConfigured, setAiConfigured] = useState(false);
  const [aiBusy, setAiBusy] = useState(false);
  const [name, setName] = useState(office?.name ?? "");
  const [lawyerName, setLawyerName] = useState(office?.lawyerName ?? "");
  const [address, setAddress] = useState(office?.address ?? "");
  const [phone, setPhone] = useState(office?.phone ?? "");
  const [barNumber, setBarNumber] = useState(office?.barNumber ?? "");
  const [lastBackupAt, setLastBackupAt] = useState(() => {
    try { return localStorage.getItem("lex-nova-last-backup-at") ?? ""; } catch { return ""; }
  });

  const importBackupText = useCallback(async (text: string) => {
    try {
      const data: unknown = JSON.parse(text);
      if (!isLexNovaBackup(data)) throw new Error("invalid backup");
      if (!window.confirm("بازیابی، اطلاعات فعلی این دستگاه را با اطلاعات فایل پشتیبان جایگزین می‌کند. پیش از ادامه، از اطلاعات فعلی خروجی بگیرید. ادامه می‌دهید؟")) return;
      restoreBackup(data);
      setName(data.office.name);
      setLawyerName(data.office.lawyerName);
      setAddress(data.office.address);
      setPhone(data.office.phone);
      setBarNumber(data.office.barNumber);
      toast.success("نسخه پشتیبان با موفقیت بازیابی شد.");
    } catch {
      toast.error("این فایل، پشتیبان معتبر Lex Nova نیست.");
    } finally {
      if (backupInput.current) backupInput.current.value = "";
    }
  }, [restoreBackup]);

  useEffect(() => {
    const bridge = (window as Window & { chrome?: { webview?: { postMessage: (message: unknown) => void; addEventListener: (name: "message", listener: (event: MessageEvent) => void) => void; removeEventListener: (name: "message", listener: (event: MessageEvent) => void) => void } } }).chrome?.webview;
    if (!bridge) return;
    const onMessage = (event: MessageEvent) => {
      const message = event.data as { type?: string; requestId?: string; content?: string; configured?: boolean; ok?: boolean; error?: string };
      if (message.type === "file-operation-error") { toast.error("انتخاب فایل ناموفق بود. دوباره تلاش کنید."); return; }
      if (message.type === "ai-operation-error") { setAiBusy(false); toast.error(message.error || "درخواست هوش مصنوعی ناموفق بود."); return; }
      if (message.requestId === aiRequest.current && message.type === "ai-key-status") setAiConfigured(message.configured === true);
      if (message.requestId === aiRequest.current && message.type === "ai-key-saved") { setAiConfigured(true); setAiKey(""); toast.success("کلید API به‌شکل رمزگذاری‌شده ذخیره شد."); }
      if (message.requestId === aiRequest.current && message.type === "ai-key-deleted") { setAiConfigured(false); toast.success("کلید ذخیره‌شده حذف شد."); }
      if (message.requestId === aiRequest.current && message.type === "ai-test-result") {
        setAiBusy(false);
        if (message.ok) toast.success("اتصال هوش مصنوعی برقرار است.");
        else toast.error(message.error || "اتصال ناموفق بود.");
      }
      if (message.type === "backup-saved" && message.requestId === backupRequest.current) {
        backupRequest.current = "";
        const exportedAt = new Date().toISOString();
        try { localStorage.setItem("lex-nova-last-backup-at", exportedAt); } catch { /* storage can be disabled */ }
        setLastBackupAt(exportedAt);
        toast.success("نسخه پشتیبان ذخیره شد.");
        return;
      }
      if (message.type !== "backup-selected" || message.requestId !== backupRequest.current || typeof message.content !== "string") return;
      backupRequest.current = "";
      void importBackupText(message.content);
    };
    bridge.addEventListener("message", onMessage);
    aiRequest.current = crypto.randomUUID();
    bridge.postMessage({ type: "get-ai-status", requestId: aiRequest.current });
    return () => bridge.removeEventListener("message", onMessage);
  }, [importBackupText]);

  const downloadBackup = () => {
    const backup: LexNovaBackup = {
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      office,
      clients,
      cases,
      parties,
      deadlines,
      timeline,
      documents,
      notes,
      transactions,
      petitions,
      hearings,
      members,
      notices,
      chat,
    };
    const content = JSON.stringify(backup, null, 2);
    const bridge = (window as Window & { chrome?: { webview?: { postMessage: (message: unknown) => void } } }).chrome?.webview;
    if (bridge) {
      backupRequest.current = crypto.randomUUID();
      bridge.postMessage({ type: "save-backup", requestId: backupRequest.current, content });
      return;
    }
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `lex-nova-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    const exportedAt = new Date().toISOString();
    try { localStorage.setItem("lex-nova-last-backup-at", exportedAt); } catch { /* storage can be disabled */ }
    setLastBackupAt(exportedAt);
    toast.success("نسخه پشتیبان دانلود شد.");
  };

  const importBackup = async (file?: File) => { if (file) await importBackupText(await file.text()); };

  const chooseBackup = () => {
    const bridge = (window as Window & { chrome?: { webview?: { postMessage: (message: unknown) => void } } }).chrome?.webview;
    if (!bridge) { backupInput.current?.click(); return; }
    backupRequest.current = crypto.randomUUID();
    bridge.postMessage({ type: "pick-backup", requestId: backupRequest.current });
  };

  const sendAiConfig = (type: "save-ai-key" | "delete-ai-key" | "test-ai", extra: Record<string, string> = {}) => {
    const bridge = (window as Window & { chrome?: { webview?: { postMessage: (message: unknown) => void } } }).chrome?.webview;
    if (!bridge) { toast.error("تنظیم کلید مستقیم فقط در نسخه دسکتاپ ویندوز در دسترس است."); return; }
    aiRequest.current = crypto.randomUUID();
    setAiBusy(type === "test-ai");
    bridge.postMessage({ type, requestId: aiRequest.current, ...extra });
  };

  return (
    <AppShell>
      <PageHeader title="تنظیمات" subtitle="مشخصات دفتر برای سربرگ لوایح و فضای کاری" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Surface>
          <h2 className="mb-4 font-semibold text-navy">سربرگ دفتر</h2>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              updateOffice({ name, lawyerName, address, phone, barNumber });
              toast.success("مشخصات دفتر ذخیره شد.");
            }}
          >
            <label className="block text-sm font-medium">
              نام دفتر
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm" />
            </label>
            <label className="block text-sm font-medium">
              وکیل مسئول
              <input value={lawyerName} onChange={(e) => setLawyerName(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm" />
            </label>
            <label className="block text-sm font-medium">
              شماره پروانه
              <input value={barNumber} onChange={(e) => setBarNumber(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm" />
            </label>
            <label className="block text-sm font-medium">
              تلفن
              <input dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm" />
            </label>
            <label className="block text-sm font-medium">
              نشانی
              <input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm" />
            </label>
            <button className="h-11 rounded-md bg-navy px-5 text-sm text-paper">ذخیره سربرگ</button>
          </form>
        </Surface>
        <Surface>
          <h2 className="mb-4 font-semibold text-navy">کاربر</h2>
          <Row k="وکیل یا وکلای مسئول" v={office?.lawyerName?.trim() || "—"} />
          <Row k="نقش" v={user?.role ?? "—"} />
          <Row k="موبایل" v={user?.mobile ?? "—"} ltr />
          <Row k="پلن" v={planLabel[user?.plan ?? "pro"]} />
          <Row k="تعداد موکل" v={toFaDigits(clients.length)} />
          <Row k="تعداد پرونده" v={toFaDigits(cases.length)} />
        </Surface>
        <Surface className="lg:col-span-2">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-paper text-brass"><Bot className="size-5" /></span>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-navy">اتصال هوش مصنوعی Grok</h2>
              <p className="mt-1 text-sm text-muted">برای پاسخ آنلاین، اینترنت و کلید API لازم است. کلید فقط به‌صورت رمزگذاری‌شده در حساب ویندوز شما ذخیره می‌شود و وارد پشتیبان یا فایل برنامه نمی‌شود. ارسال اطلاعات پرونده به سرویس بیرونی با درخواست شما انجام می‌شود.</p>
              <p className="mt-2 text-xs text-muted">وضعیت: {aiConfigured ? "کلید روی این دستگاه ذخیره شده" : "کلید تنظیم نشده"} · مدل Grok 4.7 · هزینهٔ استفاده طبق حساب API شما</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <input type="password" autoComplete="new-password" value={aiKey} onChange={(event) => setAiKey(event.target.value)} placeholder="کلید API xAI" className="h-11 min-w-64 flex-1 rounded-md border border-line bg-paper px-3 text-sm" />
                <button type="button" disabled={aiBusy || aiKey.trim().length < 20} onClick={() => sendAiConfig("save-ai-key", { key: aiKey.trim() })} className="h-11 rounded-md bg-navy px-4 text-sm text-paper disabled:opacity-50">ذخیره امن کلید</button>
                <button type="button" disabled={aiBusy || !aiConfigured} onClick={() => sendAiConfig("test-ai")} className="h-11 rounded-md border border-line px-4 text-sm disabled:opacity-50">{aiBusy ? "در حال بررسی…" : "آزمایش اتصال"}</button>
                <button type="button" disabled={aiBusy || !aiConfigured} onClick={() => sendAiConfig("delete-ai-key")} className="h-11 rounded-md border border-danger px-4 text-sm text-danger disabled:opacity-50">حذف کلید</button>
              </div>
            </div>
          </div>
        </Surface>
        <Surface className="lg:col-span-2">
          <h2 className="mb-3 font-semibold text-navy">پلن‌ها</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <Plan name="آزاد" items={["تا ۲۰ پرونده", "مواعد پایه", "یک کاربر"]} />
            <Plan name="حرفه‌ای" items={["پرونده نامحدود", "وجوه امانی", "ویرایشگر لایحه"]} current />
            <Plan name="اولترا" items={["پورتال موکل", "تحلیل ریسک", "همگام‌سازی ابری"]} />
          </div>
        </Surface>
        <Surface className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-navy">پشتیبان‌گیری و انتقال داده</h2>
              <p className="mt-1 max-w-2xl text-sm text-muted">
                یک نسخه رمزنگاری‌نشده از داده‌های دفتر، شامل پرونده‌ها، موکلین، مالی و پیش‌نویس‌ها دریافت کنید و فقط در محل امن نگهدارید.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={downloadBackup} className="inline-flex h-11 items-center gap-2 rounded-md bg-navy px-4 text-sm font-medium text-paper hover:bg-navy-deep">
                <Download className="size-4" />
                دریافت پشتیبان
              </button>
              <button onClick={chooseBackup} className="inline-flex h-11 items-center gap-2 rounded-md border border-line bg-paper px-4 text-sm font-medium text-navy hover:border-navy/30">
                <HardDriveUpload className="size-4" />
                بازیابی پشتیبان
              </button>
              <input ref={backupInput} className="hidden" type="file" accept="application/json,.json" onChange={(event) => void importBackup(event.target.files?.[0])} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-md bg-paper p-3 text-sm text-muted">
            <MonitorDown className="size-4 shrink-0 text-brass" />
            همین فایل برای جابه‌جایی داده‌ها میان نسخه وب و نسخه دسکتاپ ویندوز قابل استفاده است.
          </div>
          <p className="mt-2 text-xs text-muted">آخرین خروجی پشتیبان: {lastBackupAt ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(lastBackupAt)) : "هنوز تهیه نشده"}</p>
        </Surface>
        <Surface className="lg:col-span-2">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-paper text-brass">
              <Database className="size-5" />
            </span>
            <div>
              <h2 className="font-semibold text-navy">وضعیت ذخیره‌سازی</h2>
              <p className="mt-1 text-sm text-muted">
                داده‌های دفتر در دیتابیس محلی IndexedDB این دستگاه نگهداری می‌شود؛ این روش برای پرونده‌های حقوقی، بدون انتقال اطلاعات هویتی به سرور، امن‌تر است.
              </p>
              <p className="mt-2 text-xs text-muted">
                برای انتقال به دستگاه دیگر، از نسخهٔ پشتیبان همین صفحه استفاده کنید. همگام‌سازی ابری فقط پس از فعال‌سازی ورود امن و حساب‌های کاربری اضافه خواهد شد.
              </p>
            </div>
          </div>
        </Surface>
      </div>
      <p className="mt-6 text-sm text-muted">
        داده‌های این نسخه روی همین دستگاه ذخیره می‌شود. پیامک واقعی، حساب بانکی و همگام‌سازی ابری در نسخه سازمانی فعال می‌شود.
      </p>
      <button
        onClick={() => {
          if (window.confirm("همهٔ تغییرات محلی پاک و اطلاعات نمایشی اولیه جایگزین شود؟ اگر پشتیبان ندارید، این کار قابل بازگشت نیست.")) {
          resetDemo();
            toast.success("داده‌های نمایشی بازنشانی شد.");
          }
        }}
        className="mt-4 h-11 rounded-md border border-line px-4 text-sm"
      >
        بازنشانی داده‌های نمایشی
      </button>
    </AppShell>
  );
}

function Row({ k, v, ltr }: { k: string; v: string; ltr?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-line py-2.5 text-sm last:border-0">
      <span className="text-muted">{k}</span>
      <span className="font-medium" dir={ltr ? "ltr" : "rtl"}>
        {v}
      </span>
    </div>
  );
}

function Plan({ name, items, current }: { name: string; items: string[]; current?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 ${current ? "border-navy bg-paper" : "border-line"}`}>
      <p className="font-semibold text-navy">{name}</p>
      <ul className="mt-2 space-y-1 text-sm text-muted">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
