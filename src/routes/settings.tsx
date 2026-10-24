import { createFileRoute } from "@tanstack/react-router";
import { Database, Download, HardDriveUpload, MonitorDown } from "lucide-react";
import { useRef, useState } from "react";
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
  const [name, setName] = useState(office?.name ?? "");
  const [lawyerName, setLawyerName] = useState(office?.lawyerName ?? "");
  const [address, setAddress] = useState(office?.address ?? "");
  const [phone, setPhone] = useState(office?.phone ?? "");
  const [barNumber, setBarNumber] = useState(office?.barNumber ?? "");
  const [lastBackupAt, setLastBackupAt] = useState(() => {
    try { return localStorage.getItem("lex-nova-last-backup-at") ?? ""; } catch { return ""; }
  });

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
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
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

  const importBackup = async (file?: File) => {
    if (!file) return;
    try {
      const data: unknown = JSON.parse(await file.text());
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
          <Row k="نام" v={user?.fullName ?? "—"} />
          <Row k="نقش" v={user?.role ?? "—"} />
          <Row k="موبایل" v={user?.mobile ?? "—"} ltr />
          <Row k="پلن" v={planLabel[user?.plan ?? "pro"]} />
          <Row k="تعداد موکل" v={toFaDigits(clients.length)} />
          <Row k="تعداد پرونده" v={toFaDigits(cases.length)} />
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
              <button onClick={() => backupInput.current?.click()} className="inline-flex h-11 items-center gap-2 rounded-md border border-line bg-paper px-4 text-sm font-medium text-navy hover:border-navy/30">
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
