import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpLeft, BookOpen, ChevronLeft, ChevronRight, ClipboardList, Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { LegalMatterPicker } from "@/components/LegalMatterPicker";
import { PageHeader } from "@/components/PageHeader";
import { legalLibrary, sourceKindLabel } from "@/lib/legal-library";
import { legalMatterActionTypes, legalMatterCatalog, legalMatterCategories, searchLegalMatters } from "@/lib/legal-matters";
import { toFaDigits } from "@/lib/utils";

export const Route = createFileRoute("/library")({ component: LibraryPage });

type LibraryTab = "sources" | "matters";
const MATTER_PAGE_SIZE = 24;

function LibraryPage() {
  const [tab, setTab] = useState<LibraryTab>("sources");
  const [q, setQ] = useState("");
  const [kind, setKind] = useState("all");
  const [matterQuery, setMatterQuery] = useState("");
  const [category, setCategory] = useState("");
  const [actionType, setActionType] = useState("");
  const [selectedMatterId, setSelectedMatterId] = useState("");
  const [page, setPage] = useState(1);

  const sources = useMemo(
    () => legalLibrary.filter((source) => {
      const hit = !q || source.title.includes(q) || source.article.includes(q) || source.summary.includes(q);
      return hit && (kind === "all" || source.kind === kind);
    }),
    [q, kind],
  );
  const matters = useMemo(
    () => searchLegalMatters(matterQuery, { category: category || undefined, actionType: actionType || undefined })
      .filter((matter) => !selectedMatterId || matter.id === selectedMatterId),
    [matterQuery, category, actionType, selectedMatterId],
  );
  const pageCount = Math.max(1, Math.ceil(matters.length / MATTER_PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleMatters = matters.slice((currentPage - 1) * MATTER_PAGE_SIZE, currentPage * MATTER_PAGE_SIZE);

  const updateMatterFilter = (update: () => void) => {
    update();
    setPage(1);
  };

  return (
    <AppShell>
      <PageHeader title="کتابخانه حقوقی" subtitle="منابع حقوقی دفتر و بانک عناوین خواسته‌ها و دعاوی قابل طرح" />
      <div role="tablist" aria-label="بخش‌های کتابخانه حقوقی" className="mb-5 flex flex-wrap gap-2 border-b border-line">
        <button type="button" role="tab" aria-selected={tab === "sources"} onClick={() => setTab("sources")} className={`inline-flex h-11 items-center gap-2 border-b-2 px-3 text-sm ${tab === "sources" ? "border-navy font-medium text-navy" : "border-transparent text-muted"}`}>
          <BookOpen className="size-4" /> منابع حقوقی
        </button>
        <button type="button" role="tab" aria-selected={tab === "matters"} onClick={() => setTab("matters")} className={`inline-flex h-11 items-center gap-2 border-b-2 px-3 text-sm ${tab === "matters" ? "border-navy font-medium text-navy" : "border-transparent text-muted"}`}>
          <ClipboardList className="size-4" /> عناوین خواسته‌ها و دعاوی
          <span className="rounded-full bg-paper px-2 py-0.5 text-xs tabular-nums">{toFaDigits(legalMatterCatalog.matters.length)}</span>
        </button>
      </div>

      {tab === "sources" ? (
        <section role="tabpanel" aria-label="منابع حقوقی">
          <div className="mb-4 flex flex-wrap gap-2">
            <label className="relative min-w-48 flex-1">
              <span className="sr-only">جستجو در منابع</span>
              <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input value={q} onChange={(event) => setQ(event.target.value)} placeholder="جستجو در عنوان، ماده یا متن" className="h-11 w-full rounded-md border border-line bg-surface py-2 pe-10 ps-3 text-sm" />
            </label>
            <select aria-label="نوع منبع" value={kind} onChange={(event) => setKind(event.target.value)} className="h-11 rounded-md border border-line bg-surface px-3 text-sm">
              <option value="all">همه انواع</option>
              <option value="law">قانون</option>
              <option value="procedure">آیین دادرسی</option>
              <option value="unity">وحدت رویه</option>
              <option value="opinion">نظامات</option>
            </select>
          </div>
          <div className="space-y-3">
            {sources.map((source) => (
              <article key={source.id} className="rounded-lg border border-line bg-surface p-4 sm:p-5">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold text-navy">{source.title}</h2>
                  <span className="rounded-full bg-paper px-2 py-0.5 text-xs text-muted">{sourceKindLabel[source.kind]}</span>
                </div>
                <p className="text-sm text-brass">{source.article}</p>
                <p className="mt-2 text-sm leading-7">{source.summary}</p>
                <p className="mt-2 text-xs text-muted">{source.citation}</p>
              </article>
            ))}
            {sources.length === 0 && <p className="rounded-lg border border-line bg-surface p-8 text-center text-sm text-muted">منبعی با این مشخصات پیدا نشد.</p>}
          </div>
        </section>
      ) : (
        <section role="tabpanel" aria-label="عناوین خواسته‌ها و دعاوی" className="space-y-4">
          <div className="rounded-lg border border-warn/30 bg-warn/5 p-4 text-sm leading-7 text-muted">
            <p className="font-medium text-ink">کاتالوگ پایه؛ نه نظر حقوقی نهایی</p>
            <p>{legalMatterCatalog.disclaimer}</p>
            <p className="mt-1 text-xs">صلاحیت مرجع، قابلیت اعتراض و مهلت‌ها را پیش از اقدام با متن تنقیح‌شدهٔ قانون و وضعیت پرونده تطبیق دهید.</p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(16rem,1fr)_minmax(12rem,0.5fr)_minmax(12rem,0.5fr)]">
            <label htmlFor="matter-catalog-search" className="block text-sm font-medium sm:col-span-2 lg:col-span-1">
              عنوان، خواسته یا موضوع شکایت/پرونده
              <LegalMatterPicker
                id="matter-catalog-search"
                value={matterQuery}
                onChange={(value) => updateMatterFilter(() => { setMatterQuery(value); setSelectedMatterId(""); })}
                onSelect={(matter) => updateMatterFilter(() => {
                  setMatterQuery(matter.title);
                  setCategory(matter.category);
                  setActionType(matter.action_type);
                  setSelectedMatterId(matter.id);
                })}
                className="mt-1"
              />
            </label>
            <label>
              <span className="sr-only">گروه حقوقی</span>
              <select value={category} onChange={(event) => updateMatterFilter(() => { setCategory(event.target.value); setSelectedMatterId(""); })} className="h-11 w-full rounded-md border border-line bg-surface px-3 text-sm">
                <option value="">همه گروه‌ها</option>
                {legalMatterCategories.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span className="sr-only">نوع اقدام</span>
              <select value={actionType} onChange={(event) => updateMatterFilter(() => { setActionType(event.target.value); setSelectedMatterId(""); })} className="h-11 w-full rounded-md border border-line bg-surface px-3 text-sm">
                <option value="">همه انواع اقدام</option>
                {legalMatterActionTypes.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted" aria-live="polite">
            <p>{toFaDigits(matters.length)} عنوان · صفحهٔ {toFaDigits(currentPage)} از {toFaDigits(pageCount)}</p>
            {(matterQuery || category || actionType) && <button type="button" onClick={() => { setMatterQuery(""); setCategory(""); setActionType(""); setSelectedMatterId(""); setPage(1); }} className="h-10 rounded-md border border-line px-3 text-navy">پاک‌کردن فیلترها</button>}
          </div>

          <div className="space-y-3">
            {visibleMatters.map((matter) => (
              <article key={matter.id} className="rounded-lg border border-line bg-surface p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-navy">{matter.title}</h2>
                      <span className="rounded-full bg-paper px-2 py-0.5 text-xs text-muted">{matter.action_type}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{matter.category} · {matter.subcategory}</p>
                    <p className="mt-1 text-xs text-muted">شناسهٔ کاتالوگ: <span dir="ltr" className="tabular-nums">{matter.id}</span> · {matter.nature}</p>
                  </div>
                  <Link to="/cases/new" search={{ title: matter.title }} className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md border border-line px-3 text-sm text-navy hover:border-navy/30">
                    ایجاد پرونده با این عنوان <ArrowUpLeft className="size-4" />
                  </Link>
                </div>
                <details className="mt-3 border-t border-line pt-3">
                  <summary className="min-h-11 cursor-pointer py-2 text-sm font-medium text-navy">مشاهدهٔ اطلاعات اولیهٔ مرجع، مستند و مهلت</summary>
                  <dl className="mt-2 grid gap-x-5 gap-y-3 text-sm sm:grid-cols-2">
                    <MatterField label="مرجع صالح (پیشنهادی)" value={matter.competent_forum} />
                    <MatterField label="مبنای قانونی اولیه" value={matter.legal_basis} />
                    <MatterField label="قابلیت اعتراض" value={matter.appealability} />
                    <MatterField label="مهلت" value={matter.deadline} />
                  </dl>
                  {matter.aliases.length > 0 && <p className="mt-3 text-xs text-muted">نام‌های جایگزین: {matter.aliases.join("، ")}</p>}
                  <p className="mt-3 rounded-md bg-paper p-3 text-xs leading-6 text-muted">وضعیت: {matter.verification_status} · آخرین بازبینی داده: {matter.last_reviewed}<br />{matter.notes}</p>
                </details>
              </article>
            ))}
            {visibleMatters.length === 0 && <p className="rounded-lg border border-line bg-surface p-8 text-center text-sm text-muted">عنوانی با این جستجو یا فیلترها پیدا نشد.</p>}
          </div>

          {pageCount > 1 && <nav aria-label="صفحه‌بندی عناوین دعاوی" className="flex items-center justify-center gap-2 pt-2">
            <button type="button" disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="inline-flex h-11 items-center gap-1 rounded-md border border-line px-3 text-sm disabled:opacity-50"><ChevronRight className="size-4" /> قبلی</button>
            <span className="px-2 text-sm text-muted tabular-nums">{toFaDigits(currentPage)} / {toFaDigits(pageCount)}</span>
            <button type="button" disabled={currentPage >= pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className="inline-flex h-11 items-center gap-1 rounded-md border border-line px-3 text-sm disabled:opacity-50">بعدی <ChevronLeft className="size-4" /></button>
          </nav>}
        </section>
      )}
    </AppShell>
  );
}

function MatterField({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs text-muted">{label}</dt><dd className="mt-1 leading-7">{value}</dd></div>;
}
