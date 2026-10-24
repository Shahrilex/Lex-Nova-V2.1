import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Attachments } from "@/components/Attachments";
import { DeadlineBadge, StatusBadge } from "@/components/Badges";
import { caseTypeLabel, partyRoleLabel, statusLabel, txLabel } from "@/lib/seed";
import { useApp } from "@/lib/store";
import { draftPetition } from "@/lib/ai-draft";
import { generateDraft } from "@/lib/generate-draft";
import { copyText, printLegalDoc } from "@/lib/print";
import { money, parseAmount, todayJalali } from "@/lib/utils";
import type { CaseStatus, PartyRole, TxType } from "@/lib/types";

export const Route = createFileRoute("/cases_/$id")({ component: CaseDetail });

type Tab = "summary" | "parties" | "timeline" | "docs" | "deadlines" | "finance" | "notes" | "ai";

function CaseDetail() {
  const { id } = Route.useParams();
  const caseItem = useApp((s) => s.cases.find((c) => c.id === id));
  const client = useApp((s) => s.clients.find((c) => c.id === caseItem?.clientId));
  const deadlines = useApp(useShallow((s) => s.deadlines.filter((d) => d.caseId === id)));
  const timeline = useApp(useShallow((s) => s.timeline.filter((t) => t.caseId === id)));
  const documents = useApp(useShallow((s) => s.documents.filter((d) => d.caseId === id)));
  const notes = useApp(useShallow((s) => s.notes.filter((n) => n.caseId === id)));
  const parties = useApp(useShallow((s) => s.parties.filter((p) => p.caseId === id)));
  const txs = useApp(useShallow((s) => s.transactions.filter((t) => t.caseId === id)));
  const hearings = useApp(useShallow((s) => s.hearings.filter((h) => h.caseId === id)));
  const petitions = useApp(useShallow((s) => s.petitions.filter((p) => p.caseId === id)));
  const office = useApp((s) => s.office);
  const addNote = useApp((s) => s.addNote);
  const addTimeline = useApp((s) => s.addTimeline);
  const addDocument = useApp((s) => s.addDocument);
  const deleteDocument = useApp((s) => s.deleteDocument);
  const updateDocument = useApp((s) => s.updateDocument);
  const addDeadline = useApp((s) => s.addDeadline);
  const toggleDeadline = useApp((s) => s.toggleDeadline);
  const addParty = useApp((s) => s.addParty);
  const addTransaction = useApp((s) => s.addTransaction);
  const savePetition = useApp((s) => s.savePetition);
  const updateCase = useApp((s) => s.updateCase);
  const deleteCase = useApp((s) => s.deleteCase);
  const updateCaseAttachments = useApp((s) => s.updateCaseAttachments);
  const navigate = useNavigate();
  const [editingCase, setEditingCase] = useState(false);
  const [editTitle, setEditTitle] = useState(caseItem?.title ?? "");
  const [editCourt, setEditCourt] = useState(caseItem?.court ?? "");
  const [editBranch, setEditBranch] = useState(caseItem?.branch ?? "");
  const [editDescription, setEditDescription] = useState(caseItem?.description ?? "");
  const updateHearing = useApp((s) => s.updateHearing);
  const [tab, setTab] = useState<Tab>("summary");
  const [note, setNote] = useState("");
  const [action, setAction] = useState("");
  const [docTitle, setDocTitle] = useState("");
  const [dlTitle, setDlTitle] = useState("");
  const [dlDate, setDlDate] = useState("");
  const [pName, setPName] = useState("");
  const [pCode, setPCode] = useState("");
  const [pRole, setPRole] = useState<PartyRole>("opponent");
  const [draft, setDraft] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [aiHint, setAiHint] = useState("");
  const [txType, setTxType] = useState<TxType>("income");
  const [txAmount, setTxAmount] = useState("");
  const [txDesc, setTxDesc] = useState("");
  const [hearingDrafts, setHearingDrafts] = useState<Record<string, string>>({});

  if (!caseItem) {
    return (
      <AppShell>
        <p className="text-muted">پرونده یافت نشد.</p>
        <Link to="/cases" className="text-sm text-brass">
          بازگشت
        </Link>
      </AppShell>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "summary", label: "خلاصه" },
    { id: "parties", label: "طرفین" },
    { id: "timeline", label: "تایم‌لاین" },
    { id: "docs", label: "اسناد" },
    { id: "deadlines", label: "مواعد" },
    { id: "finance", label: "مالی" },
    { id: "notes", label: "یادداشت" },
    { id: "ai", label: "هوش مصنوعی" },
  ];

  const claim = Number(caseItem.claimAmount) || 0;

  return (
    <AppShell>
      <Link to="/cases" className="mb-3 inline-block text-sm text-muted hover:text-navy">
        بازگشت به پرونده‌ها
      </Link>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold text-navy">{caseItem.title}</h1>
            <StatusBadge status={caseItem.status} />
            <select
              value={caseItem.status}
              onChange={(e) => {
                updateCase(id, { status: e.target.value as CaseStatus });
                toast.success("وضعیت پرونده به‌روز شد.");
              }}
              className="h-11 rounded-md border border-line bg-surface px-3 text-sm"
              aria-label="وضعیت پرونده"
            >
              {Object.entries(statusLabel).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-1 text-sm text-muted">
            {caseItem.caseNumber || "بدون کلاسه"} · {caseItem.court || "—"} {caseItem.branch && `· ${caseItem.branch}`} ·{" "}
            {caseTypeLabel[caseItem.caseType]}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-md border border-line px-4 text-sm"
            onClick={() => {
              const body = [
                `پرونده: ${caseItem.title}`,
                `کلاسه: ${caseItem.caseNumber || "—"}`,
                `موکل: ${client?.fullName ?? "—"}`,
                `مرجع: ${caseItem.court} ${caseItem.branch}`,
                `خواسته: ${claim ? money(claim) : "غیرمالی"}`,
                "",
                caseItem.description,
                "",
                "طرفین:",
                ...parties.map((p) => `- ${p.fullName} (${partyRoleLabel[p.role]})`),
                "",
                "مواعد باز:",
                ...deadlines.filter((d) => !d.isCompleted).map((d) => `- ${d.title} · ${d.dueDate}`),
              ].join("\n");
              printLegalDoc({
                officeName: office?.name ?? "دفتر وکالت",
                lawyerName: office?.lawyerName ?? "",
                barNumber: office?.barNumber,
                heading: `خلاصه پرونده ${caseItem.title}`,
                meta: caseItem.caseNumber,
                body,
              });
            }}
          >
            چاپ خلاصه
          </button>
          <Link
            to="/assistant"
            search={{ caseId: caseItem.id, q: `پرونده «${caseItem.title}» را خلاصه کن و ریسک مواعد را بگو.` }}
            className="inline-flex h-11 items-center rounded-md border border-line px-4 text-sm"
          >
            پرسش از دستیار
          </Link>
          <Link
            to="/editor"
            search={{ caseId: caseItem.id }}
            className="inline-flex h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-paper"
          >
            نوشتن لایحه
          </Link>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => setEditingCase((value) => !value)} className="h-10 rounded-md border border-line px-4 text-sm">{editingCase ? "بستن ویرایش" : "ویرایش پرونده"}</button>
        <button type="button" onClick={() => { if (window.confirm(`پرونده «${caseItem.title}» و اطلاعات وابسته حذف شود؟`)) { deleteCase(id); navigate({ to: "/cases" }); } }} className="h-10 rounded-md border border-danger px-4 text-sm text-danger">حذف پرونده</button>
      </div>
      {editingCase && <form className="mb-5 grid gap-3 rounded-xl border border-line bg-surface p-4 sm:grid-cols-2" onSubmit={(event) => { event.preventDefault(); updateCase(id, { title: editTitle.trim(), court: editCourt, branch: editBranch, description: editDescription }); setEditingCase(false); toast.success("پرونده به‌روز شد."); }}>
        <label className="text-sm">عنوان<input required value={editTitle} onChange={(event) => setEditTitle(event.target.value)} className="mt-1 h-11 w-full rounded-md border border-line bg-paper px-3" /></label>
        <label className="text-sm">مرجع قضایی<input value={editCourt} onChange={(event) => setEditCourt(event.target.value)} className="mt-1 h-11 w-full rounded-md border border-line bg-paper px-3" /></label>
        <label className="text-sm">شعبه<input value={editBranch} onChange={(event) => setEditBranch(event.target.value)} className="mt-1 h-11 w-full rounded-md border border-line bg-paper px-3" /></label>
        <label className="text-sm sm:col-span-2">شرح<textarea value={editDescription} onChange={(event) => setEditDescription(event.target.value)} className="mt-1 min-h-24 w-full rounded-md border border-line bg-paper p-3" /></label>
        <button className="h-11 rounded-md bg-navy px-4 text-sm text-paper sm:col-span-2">ذخیره تغییرات</button>
      </form>}
      <div className="mb-5"><Attachments files={caseItem.attachments ?? []} onChange={(attachments) => updateCaseAttachments(id, attachments)} /></div>

      <div className="mb-4 flex flex-wrap gap-1 overflow-x-auto border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`h-11 shrink-0 px-4 text-sm ${tab === t.id ? "border-b-2 border-navy font-medium text-navy" : "text-muted"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "summary" && (
        <section className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {client ? (
              <Link
                to="/clients/$id"
                params={{ id: client.id }}
                className="rounded-xl border border-line bg-surface p-4 hover:border-navy/30"
              >
                <p className="text-xs text-muted">موکل</p>
                <p className="mt-1 font-medium">{client.fullName}</p>
              </Link>
            ) : (
              <Mini label="موکل" value="—" />
            )}
            <Mini label="تاریخ تشکیل" value={caseItem.openedAt} />
            <Mini label="خواسته" value={claim ? money(claim) : "غیرمالی / نامشخص"} />
            <Mini label="مواعد باز" value={String(deadlines.filter((d) => !d.isCompleted).length)} />
          </div>
          {caseItem.description && (
            <p className="rounded-xl border border-line bg-surface p-4 text-sm leading-7">{caseItem.description}</p>
          )}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-line bg-surface p-4">
              <h3 className="mb-2 text-sm font-semibold text-navy">جلسات</h3>
              {hearings.length === 0 && <p className="text-sm text-muted">جلسه‌ای ثبت نشده.</p>}
              {hearings.map((h) => (
                <form
                  key={h.id}
                  className="mb-3 space-y-1 text-sm"
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateHearing(h.id, { result: hearingDrafts[h.id] ?? h.result });
                    toast.success("نتیجه جلسه ثبت شد.");
                  }}
                >
                  <p>
                    {h.date} · {h.time} — {h.subject}
                  </p>
                  <div className="flex gap-2">
                    <input
                      value={hearingDrafts[h.id] ?? h.result}
                      onChange={(e) => setHearingDrafts((s) => ({ ...s, [h.id]: e.target.value }))}
                      placeholder="نتیجه جلسه"
                      className="h-11 flex-1 rounded-md border border-line bg-paper px-3 text-sm"
                    />
                    <button className="h-11 rounded-md border border-line px-3 text-xs">ثبت</button>
                  </div>
                </form>
              ))}
            </div>
            <div className="rounded-xl border border-line bg-surface p-4">
              <h3 className="mb-2 text-sm font-semibold text-navy">طرفین</h3>
              {parties.slice(0, 4).map((p) => (
                <p key={p.id} className="text-sm">
                  {p.fullName} · {partyRoleLabel[p.role]}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === "parties" && (
        <section>
          <form
            className="mb-4 grid gap-2 sm:grid-cols-[1fr_8rem_10rem_auto]"
            onSubmit={(e) => {
              e.preventDefault();
              if (!pName.trim()) return;
              addParty({ caseId: id, fullName: pName, nationalCode: pCode, role: pRole, notes: "" });
              setPName("");
              setPCode("");
            }}
          >
            <input value={pName} onChange={(e) => setPName(e.target.value)} placeholder="نام" className="h-11 rounded-md border border-line bg-surface px-3 text-sm" />
            <input dir="ltr" value={pCode} onChange={(e) => setPCode(e.target.value)} placeholder="کد ملی" className="h-11 rounded-md border border-line bg-surface px-3 text-sm" />
            <select value={pRole} onChange={(e) => setPRole(e.target.value as PartyRole)} className="h-11 rounded-md border border-line bg-surface px-3 text-sm">
              <option value="client_side">طرف موکل</option>
              <option value="opponent">طرف مقابل</option>
              <option value="third">ثالث</option>
              <option value="opp_counsel">وکیل مقابل</option>
            </select>
            <button className="h-11 rounded-md bg-navy px-4 text-sm text-paper">افزودن</button>
          </form>
          <div className="space-y-2">
            {parties.map((p) => (
              <div key={p.id} className="flex flex-wrap justify-between gap-2 rounded-xl border border-line bg-surface px-4 py-3">
                <div>
                  <p className="font-medium">{p.fullName}</p>
                  <p className="text-xs text-muted" dir="ltr">
                    {p.nationalCode || "—"}
                  </p>
                </div>
                <span className="text-sm text-muted">{partyRoleLabel[p.role]}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "timeline" && (
        <section className="space-y-4">
          <form
            className="flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (!action.trim()) return;
              addTimeline(id, action, "", "action");
              setAction("");
            }}
          >
            <input
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="ثبت اقدام جدید"
              className="h-11 flex-1 rounded-md border border-line bg-surface px-3 text-sm"
            />
            <button className="h-11 rounded-md bg-navy px-4 text-sm text-paper">ثبت</button>
          </form>
          {timeline.map((ev, i) => (
            <div key={ev.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="mt-1 size-2.5 rounded-full bg-brass" />
                {i < timeline.length - 1 && <span className="w-px flex-1 bg-line" />}
              </div>
              <div className="pb-4">
                <p className="text-xs text-muted">
                  {ev.date} · {ev.time}
                </p>
                <p className="font-medium">{ev.title}</p>
                {ev.description && <p className="text-sm text-muted">{ev.description}</p>}
              </div>
            </div>
          ))}
          {timeline.length === 0 && <p className="text-sm text-muted">اقدامی ثبت نشده.</p>}
        </section>
      )}

      {tab === "docs" && (
        <section>
          <form
            className="mb-4 flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (!docTitle.trim()) return;
              addDocument(id, docTitle, "سند");
              setDocTitle("");
            }}
          >
            <input
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="عنوان سند"
              className="h-11 flex-1 rounded-md border border-line bg-surface px-3 text-sm"
            />
            <button className="h-11 rounded-md bg-navy px-4 text-sm text-paper">افزودن</button>
          </form>
          <div className="space-y-2">
            {documents.map((d) => (
              <div key={d.id} className="flex justify-between rounded-md border border-line bg-surface px-4 py-3 text-sm">
                <span>{d.title}</span>
                <span className="flex items-center gap-3 text-muted">
                  {d.kind} · {d.createdAt}
                  <button type="button" className="text-navy underline" onClick={() => { const title = window.prompt("عنوان سند", d.title); if (title?.trim()) updateDocument(d.id, { title: title.trim() }); }}>ویرایش</button>
                  <button type="button" className="text-danger" onClick={() => { if (window.confirm(`سند «${d.title}» حذف شود؟`)) deleteDocument(d.id); }}>حذف</button>
                </span>
              </div>
            ))}
            {documents.length === 0 && petitions.length === 0 && <p className="text-sm text-muted">سندی نیست.</p>}
          </div>
          {petitions.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-2 text-sm font-semibold text-navy">لوایح ذخیره‌شده</h3>
              <div className="space-y-2">
                {petitions.map((p) => (
                  <div key={p.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-line bg-surface px-4 py-3 text-sm">
                    <div>
                      <p className="font-medium">{p.title}</p>
                      <p className="text-xs text-muted">{p.updatedAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link to="/editor" search={{ caseId: id }} className="h-11 inline-flex items-center text-sm text-brass">
                        ویرایش
                      </Link>
                      <button
                        type="button"
                        className="h-11 rounded-md border border-line px-3 text-sm"
                        onClick={() =>
                          printLegalDoc({
                            officeName: office?.name ?? "دفتر وکالت",
                            lawyerName: office?.lawyerName ?? "",
                            barNumber: office?.barNumber,
                            heading: p.title,
                            meta: caseItem.title,
                            body: p.body,
                          })
                        }
                      >
                        چاپ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {tab === "deadlines" && (
        <section>
          <form
            className="mb-4 grid gap-2 sm:grid-cols-[1fr_10rem_auto]"
            onSubmit={(e) => {
              e.preventDefault();
              if (!dlTitle.trim() || !dlDate.trim()) return;
              addDeadline({
                title: dlTitle,
                caseId: id,
                dueDate: dlDate,
                type: "internal",
                isUrgent: false,
                legalArticle: "",
                ruleCode: "CUSTOM",
              });
              setDlTitle("");
              setDlDate("");
            }}
          >
            <input value={dlTitle} onChange={(e) => setDlTitle(e.target.value)} placeholder="عنوان موعد" className="h-11 rounded-md border border-line bg-surface px-3 text-sm" />
            <input value={dlDate} onChange={(e) => setDlDate(e.target.value)} placeholder="۱۴۰۵/۰۸/۰۱" className="h-11 rounded-md border border-line bg-surface px-3 text-sm" />
            <button className="h-11 rounded-md bg-navy px-4 text-sm text-paper">افزودن</button>
          </form>
          <div className="space-y-2">
            {deadlines.map((d) => (
              <button
                key={d.id}
                onClick={() => toggleDeadline(d.id)}
                className="flex w-full items-start justify-between rounded-md border border-line bg-surface p-4 text-right"
              >
                <div>
                  <p className={d.isCompleted ? "text-muted line-through" : "font-medium"}>{d.title}</p>
                  <p className="text-xs text-muted">{d.legalArticle}</p>
                  <DeadlineBadge type={d.type} />
                </div>
                <p className={d.isUrgent && !d.isCompleted ? "text-sm text-danger" : "text-sm text-muted"}>{d.dueDate}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      {tab === "finance" && (
        <section className="space-y-3">
          <form
            className="grid gap-2 rounded-xl border border-line bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4"
            onSubmit={(e) => {
              e.preventDefault();
              const n = parseAmount(txAmount);
              if (!n) {
                toast.error("مبلغ معتبر وارد کنید.");
                return;
              }
              addTransaction({
                caseId: id,
                type: txType,
                amount: n,
                description: txDesc || txLabel[txType],
                date: todayJalali(),
                isTrust: txType === "trust_in" || txType === "trust_out",
              });
              setTxAmount("");
              setTxDesc("");
              toast.success("تراکنش ثبت شد.");
            }}
          >
            <select value={txType} onChange={(e) => setTxType(e.target.value as TxType)} className="h-11 rounded-md border border-line bg-paper px-3 text-sm">
              <option value="income">حق‌الوکاله</option>
              <option value="trust_in">واریز امانی</option>
              <option value="trust_out">برداشت امانی</option>
              <option value="stamp">تمبر ۱۰۳</option>
              <option value="expense">هزینه</option>
            </select>
            <input
              dir="ltr"
              value={txAmount}
              onChange={(e) => setTxAmount(e.target.value)}
              placeholder="مبلغ ریال"
              className="h-11 rounded-md border border-line bg-paper px-3 text-sm"
            />
            <input
              value={txDesc}
              onChange={(e) => setTxDesc(e.target.value)}
              placeholder="شرح"
              className="h-11 rounded-md border border-line bg-paper px-3 text-sm"
            />
            <button className="h-11 rounded-md bg-navy text-sm text-paper">ثبت تراکنش</button>
          </form>
          {txs.map((t) => (
            <div key={t.id} className="flex justify-between rounded-md border border-line bg-surface px-4 py-3 text-sm">
              <span>
                {txLabel[t.type]} · {t.description}
              </span>
              <span className="tabular-nums">{money(t.amount)}</span>
            </div>
          ))}
          {txs.length === 0 && <p className="text-sm text-muted">تراکنشی نیست.</p>}
        </section>
      )}

      {tab === "notes" && (
        <section>
          <form
            className="mb-4 space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!note.trim()) return;
              addNote(id, note);
              setNote("");
            }}
          >
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-24 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm"
              placeholder="یادداشت داخلی"
            />
            <button className="h-11 rounded-md bg-navy px-4 text-sm text-paper">ذخیره یادداشت</button>
          </form>
          <div className="space-y-2">
            {notes.map((n) => (
              <div key={n.id} className="rounded-md border border-line bg-surface p-4 text-sm">
                <p className="text-xs text-muted">{n.createdAt}</p>
                <p className="mt-1">{n.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "ai" && (
        <section className="space-y-3">
          <p className="text-sm text-muted">پیش‌نویس بر اساس همین پرونده. متن باید پیش از تقدیم بازبینی شود.</p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["petition", "دادخواست"],
                ["defense", "دفاعیه"],
                ["appeal", "تجدیدنظر"],
              ] as const
            ).map(([kind, label]) => (
              <button
                key={kind}
                disabled={aiBusy}
                className={
                  kind === "petition"
                    ? "h-11 rounded-md bg-navy px-4 text-sm text-paper disabled:opacity-60"
                    : "h-11 rounded-md border border-line px-4 text-sm disabled:opacity-60"
                }
                onClick={async () => {
                  setAiBusy(true);
                  setAiHint("");
                  const facts = [
                    `موکل: ${client?.fullName ?? "نامشخص"}`,
                    `موضوع: ${caseItem.title}`,
                    `مرجع: ${caseItem.court} ${caseItem.branch}`,
                    `کلاسه: ${caseItem.caseNumber || "—"}`,
                    `خواسته: ${caseItem.claimAmount}`,
                    `شرح: ${caseItem.description}`,
                  ].join("\n");
                  try {
                    const res = await generateDraft({ data: { kind, facts } });
                    if (res.ok) {
                      setDraft(res.text);
                      setAiHint("متن با مدل هوشمند تولید شد.");
                    } else {
                      setDraft(draftPetition(kind, caseItem, client));
                      setAiHint("الگوی حقوقی دفتر اعمال شد.");
                    }
                  } catch {
                    setDraft(draftPetition(kind, caseItem, client));
                    setAiHint("الگوی حقوقی دفتر اعمال شد.");
                  } finally {
                    setAiBusy(false);
                  }
                }}
              >
                {aiBusy ? "در حال نگارش..." : label}
              </button>
            ))}
            <Link
              to="/assistant"
              search={{ caseId: id, q: `برای پرونده «${caseItem.title}» راهبرد لایحه دفاعیه پیشنهاد بده.` }}
              className="inline-flex h-11 items-center rounded-md border border-line px-4 text-sm"
            >
              گفتگو با دستیار
            </Link>
          </div>
          {aiHint && <p className="text-sm text-muted">{aiHint}</p>}
          {draft && (
            <>
              <pre className="whitespace-pre-wrap rounded-xl border border-line bg-surface p-4 text-sm leading-7">{draft}</pre>
              <div className="flex flex-wrap gap-2">
                <button
                  className="h-11 rounded-md bg-navy px-4 text-sm text-paper"
                  onClick={() => {
                    savePetition({ caseId: id, title: "پیش‌نویس هوشمند", body: draft });
                    toast.success("در پرونده ذخیره شد.");
                  }}
                >
                  ذخیره در پرونده
                </button>
                <button
                  className="h-11 rounded-md border border-line px-4 text-sm"
                  onClick={async () => toast.success((await copyText(draft)) ? "متن کپی شد." : "کپی انجام نشد.")}
                >
                  کپی
                </button>
                <button
                  className="h-11 rounded-md border border-line px-4 text-sm"
                  onClick={() =>
                    printLegalDoc({
                      officeName: office?.name ?? "دفتر وکالت",
                      lawyerName: office?.lawyerName ?? "",
                      barNumber: office?.barNumber,
                      heading: "پیش‌نویس هوشمند",
                      meta: caseItem.title,
                      body: draft,
                    })
                  }
                >
                  چاپ
                </button>
              </div>
            </>
          )}
        </section>
      )}
    </AppShell>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
