import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { PageHeader, Surface } from "@/components/PageHeader";
import { planLabel } from "@/lib/seed";
import { useApp } from "@/lib/store";
import { toFaDigits } from "@/lib/utils";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const user = useApp((s) => s.user);
  const office = useApp((s) => s.office);
  const clients = useApp((s) => s.clients);
  const cases = useApp((s) => s.cases);
  const resetDemo = useApp((s) => s.resetDemo);
  const updateOffice = useApp((s) => s.updateOffice);
  const [name, setName] = useState(office?.name ?? "");
  const [lawyerName, setLawyerName] = useState(office?.lawyerName ?? "");
  const [address, setAddress] = useState(office?.address ?? "");
  const [phone, setPhone] = useState(office?.phone ?? "");
  const [barNumber, setBarNumber] = useState(office?.barNumber ?? "");

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
      </div>
      <p className="mt-6 text-sm text-muted">
        داده‌های این نسخه روی همین دستگاه ذخیره می‌شود. پیامک واقعی، حساب بانکی و همگام‌سازی ابری در نسخه سازمانی فعال می‌شود.
      </p>
      <button
        onClick={() => {
          resetDemo();
          toast.success("داده‌های نمایشی بازنشانی شد.");
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
