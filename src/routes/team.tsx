import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { PageHeader, Surface } from "@/components/PageHeader";
import { memberRoleLabel } from "@/lib/seed";
import { useApp } from "@/lib/store";
import type { Member, MemberRole } from "@/lib/types";

export const Route = createFileRoute("/team")({ component: TeamPage });

const emptyMember = { fullName: "", mobile: "", role: "trainee" as MemberRole };

function TeamPage() {
  const members = useApp((s) => s.members);
  const addMember = useApp((s) => s.addMember);
  const updateMember = useApp((s) => s.updateMember);
  const deleteMember = useApp((s) => s.deleteMember);
  const [form, setForm] = useState(emptyMember);
  const [editing, setEditing] = useState<Member | null>(null);

  const save = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.fullName.trim()) return toast.error("نام عضو را وارد کنید.");
    if (editing) {
      updateMember(editing.id, form);
      toast.success("اطلاعات عضو ویرایش شد.");
      setEditing(null);
    } else {
      addMember(form);
      toast.success("عضو جدید افزوده شد.");
    }
    setForm(emptyMember);
  };

  const beginEdit = (member: Member) => {
    setEditing(member);
    setForm({ fullName: member.fullName, mobile: member.mobile, role: member.role });
  };

  return (
    <AppShell>
      <PageHeader title="تیم دفتر" subtitle="افزودن، ویرایش و مدیریت اعضای فضای کاری" />
      <Surface className="mb-5">
        <form className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" onSubmit={save}>
          <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="نام و نام خانوادگی" className="h-11 rounded-md border border-line bg-paper px-3 text-sm" />
          <input dir="ltr" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="شماره موبایل" className="h-11 rounded-md border border-line bg-paper px-3 text-sm" />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as MemberRole })} className="h-11 rounded-md border border-line bg-paper px-3 text-sm">
            <option value="lawyer">وکیل</option><option value="trainee">کارآموز</option><option value="secretary">منشی</option><option value="accountant">حسابدار</option>
          </select>
          <div className="flex gap-2">
            <button className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-navy px-4 text-sm font-medium text-paper"><UserPlus className="size-4" />{editing ? "ذخیره تغییرات" : "افزودن عضو"}</button>
            {editing && <button type="button" onClick={() => { setEditing(null); setForm(emptyMember); }} className="h-11 rounded-md border border-line px-3 text-sm">انصراف</button>}
          </div>
        </form>
      </Surface>
      <div className="overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full min-w-[600px] text-sm"><thead className="border-b border-line bg-paper text-muted"><tr><th className="px-4 py-3 text-right font-medium">نام</th><th className="px-4 py-3 text-right font-medium">نقش</th><th className="px-4 py-3 text-right font-medium">موبایل</th><th className="px-4 py-3 text-left font-medium">عملیات</th></tr></thead>
          <tbody>{members.map((member) => <tr key={member.id} className="border-b border-line last:border-0"><td className="px-4 py-3 font-medium">{member.fullName}</td><td className="px-4 py-3">{memberRoleLabel[member.role]}</td><td className="px-4 py-3" dir="ltr">{member.mobile || "—"}</td><td className="px-4 py-2"><div className="flex justify-end gap-2"><button type="button" onClick={() => beginEdit(member)} className="inline-flex h-10 items-center gap-1 rounded-md border border-line px-3 text-sm"><Pencil className="size-4" />ویرایش</button><button type="button" onClick={() => { if (window.confirm(`عضو «${member.fullName}» حذف شود؟`)) { deleteMember(member.id); toast.success("عضو حذف شد."); } }} className="inline-flex h-10 items-center gap-1 rounded-md border border-danger/30 px-3 text-sm text-danger"><Trash2 className="size-4" />حذف</button></div></td></tr>)}</tbody>
        </table>
      </div>
    </AppShell>
  );
}