import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUp, Copy, MessageSquareText, Scale, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { askCounsel } from "@/lib/counsel";
import { askDesktopAi, getDesktopBridge } from "@/lib/desktop-bridge";
import { buildOfficeBrief } from "@/lib/office-brief";
import { copyText } from "@/lib/print";
import { useApp } from "@/lib/store";
import { retrieveSources } from "@/lib/retrieve";
import { nowTime, uid, cn } from "@/lib/utils";

type Search = { caseId?: string; q?: string };

export const Route = createFileRoute("/assistant")({
  component: AssistantPage,
  validateSearch: (s: Record<string, unknown>): Search => ({
    caseId: typeof s.caseId === "string" ? s.caseId : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
  }),
});

function AssistantPage() {
  const search = Route.useSearch();
  const cases = useApp((s) => s.cases);
  const clients = useApp((s) => s.clients);
  const deadlines = useApp((s) => s.deadlines);
  const parties = useApp((s) => s.parties);
  const notes = useApp((s) => s.notes);
  const hearings = useApp((s) => s.hearings);
  const chat = useApp((s) => s.chat);
  const pushChat = useApp((s) => s.pushChat);
  const clearChat = useApp((s) => s.clearChat);
  const savePetition = useApp((s) => s.savePetition);
  const [caseId, setCaseId] = useState(search.caseId ?? "");
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const primed = useRef(false);

  const caseItem = cases.find((c) => c.id === caseId);
  const officeBrief = useMemo(
    () =>
      buildOfficeBrief({
        cases,
        clients,
        deadlines,
        parties,
        notes,
        hearings,
        selectedCaseId: caseId || undefined,
      }),
    [cases, clients, deadlines, parties, notes, hearings, caseId],
  );

  const suggestions = useMemo(() => {
    const urgent = deadlines.filter((d) => d.isUrgent && !d.isCompleted).slice(0, 2);
    const items = urgent.map((d) => {
      const cse = cases.find((c) => c.id === d.caseId);
      return {
        q: `موعد «${d.title}» پرونده «${cse?.title ?? ""}» را بررسی کن و گام بعدی را بگو.`,
        caseId: d.caseId,
      };
    });
    items.push({
      q: "تعارض منافع احتمالی دفتر را بر اساس طرفین پرونده‌ها تحلیل کن.",
      caseId: "p2",
    });
    items.push({
      q: "خسارت تأخیر تأدیه چک طبق رأی وحدت رویه ۷۳۳ چگونه مطالبه می‌شود؟",
      caseId: "p1",
    });
    return items.slice(0, 4);
  }, [deadlines, cases]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [chat, busy]);

  const send = async (text: string, nextCase = caseId) => {
    const query = text.trim();
    if (!query || busy) return;
    setDraft("");
    setError("");
    setSaved("");
    if (nextCase !== caseId) setCaseId(nextCase);
    pushChat({
      id: uid(),
      role: "user",
      content: query,
      at: nowTime(),
      caseId: nextCase || undefined,
    });
    setBusy(true);
    const brief = buildOfficeBrief({
      cases,
      clients,
      deadlines,
      parties,
      notes,
      hearings,
      selectedCaseId: nextCase || undefined,
    });
    const history = [...chat, { role: "user" as const, content: query }].map((m) => ({
      role: m.role,
      content: m.content,
    }));
    try {
      const desktop = getDesktopBridge();
      let answer: string | undefined;
      let answerError: string | undefined;
      let citations: import("@/lib/counsel").CounselCitation[] | undefined;
      let source: "model" | "library" = "model";
      if (desktop) {
        const res = await askDesktopAi({ query, officeBrief: brief, messages: history, sources: retrieveSources(query, 5).map(({ id, title, article, summary }) => ({ id, title, article, summary })) });
        if (res?.ok) { answer = res.text; citations = res.citations; }
        else answerError = res?.error ?? "اتصال دسکتاپ در دسترس نیست.";
      } else {
        const res = await askCounsel({ data: { query, officeBrief: brief, messages: history } });
        if (res.ok) { answer = res.text; citations = res.citations; source = res.source; }
        else answerError = res.error;
      }
      if (answer) {
        pushChat({
          id: uid(),
          role: "assistant",
          content: answer,
          at: nowTime(),
          caseId: nextCase || undefined,
          citations,
          source,
        });
      } else {
        setError(answerError ?? "پاسخ دریافت نشد.");
      }
    } catch {
      setError("ارتباط با دستیار برقرار نشد. دوباره تلاش کنید.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (primed.current) return;
    if (search.q) {
      primed.current = true;
      void send(search.q, search.caseId ?? caseId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.q]);

  const lastAssistant = [...chat].reverse().find((t) => t.role === "assistant");
  const canSaveDraft =
    !!lastAssistant &&
    lastAssistant.content.length > 180 &&
    /ریاست محترم|خواهان:/.test(lastAssistant.content);

  return (
    <AppShell>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-navy">دستیار هوشمند</h1>
          <p className="mt-1 text-sm text-muted">پرسش حقوقی، محاسبه موعد و پیش‌نویس لایحه با استناد به مواد</p>
        </div>
        <button
          type="button"
          onClick={() => clearChat()}
          className="inline-flex h-11 items-center gap-2 rounded-md border border-line px-3 text-sm text-muted transition-transform duration-150 ease-out hover:text-navy active:scale-[0.96]"
        >
          <Trash2 className="size-4" />
          پاک کردن گفتگو
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <section className="flex min-h-[32rem] flex-col overflow-hidden rounded-xl border border-line bg-surface">
          <div ref={scroller} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
            {chat.length === 0 && !busy && (
              <div className="flex h-full min-h-72 flex-col items-center justify-center px-4 text-center">
                <div className="mb-3 flex size-12 items-center justify-center rounded-lg bg-navy text-brass-soft">
                  <Scale className="size-6" />
                </div>
                <p className="font-medium text-navy">مشاور پرونده‌های همین دفتر</p>
                <p className="mt-2 max-w-sm text-sm leading-7 text-muted">
                  موعد قانونی، تعارض منافع و پیش‌نویس اوراق را با پرونده منتخب بپرسید. پاسخ باید پیش از تقدیم بازبینی شود.
                </p>
              </div>
            )}
            {chat.map((t) => (
              <article
                key={t.id}
                className={cn(
                  "counsel-msg max-w-[42rem]",
                  t.role === "user" ? "mr-auto rounded-lg bg-navy px-4 py-3 text-paper" : "ml-auto",
                )}
              >
                {t.role === "assistant" && (
                  <p className="mb-1 flex items-center gap-1.5 text-xs text-muted">
                    <MessageSquareText className="size-3.5" />
                    {t.source === "model" ? "پاسخ مدل هوشمند" : "پاسخ بر اساس منابع دفتر"}
                  </p>
                )}
                <p className={cn("whitespace-pre-wrap text-sm leading-7", t.role === "user" ? "text-paper" : "text-ink")}>
                  {t.content}
                </p>
                {t.role === "assistant" && (
                  <button
                    type="button"
                    className="mt-2 inline-flex h-11 items-center gap-1 text-xs text-muted hover:text-navy"
                    onClick={async () => toast.success((await copyText(t.content)) ? "پاسخ کپی شد." : "کپی انجام نشد.")}
                  >
                    <Copy className="size-3.5" />
                    کپی پاسخ
                  </button>
                )}
                {t.citations && t.citations.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {t.citations.map((c) => (
                      <p key={c.id} className="rounded-md border border-line bg-paper px-3 py-2 text-xs leading-6">
                        <span className="font-medium text-navy">{c.article}</span>
                        <span className="text-muted"> — {c.title}</span>
                      </p>
                    ))}
                  </div>
                )}
              </article>
            ))}
            {busy && (
              <p className="counsel-thinking text-sm" aria-live="polite">
                در حال بررسی منابع و مواعد دفتر...
              </p>
            )}
            {error && <p className="text-sm text-danger">{error}</p>}
            {saved && <p className="text-sm text-ok">{saved}</p>}
          </div>

          {canSaveDraft && caseId && (
            <div className="border-t border-line px-4 py-2">
              <button
                type="button"
                className="h-11 text-sm text-brass hover:underline"
                onClick={() => {
                  if (!lastAssistant) return;
                  savePetition({ caseId, title: "پیش‌نویس دستیار هوشمند", body: lastAssistant.content });
                  setSaved("در پرونده ذخیره شد. از ویرایشگر لایحه باز کنید.");
                  toast.success("لایحه در پرونده ذخیره شد.");
                }}
              >
                ذخیره آخرین پاسخ به‌عنوان لایحه
              </button>
            </div>
          )}

          <div className="border-t border-line p-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s.q}
                  type="button"
                  disabled={busy}
                  onClick={() => void send(s.q, s.caseId)}
                  className="h-11 max-w-full truncate rounded-md border border-line bg-paper px-3 text-right text-xs text-navy transition-colors hover:border-navy/30 disabled:opacity-50"
                >
                  {s.q}
                </button>
              ))}
            </div>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                void send(draft);
              }}
            >
              <label className="sr-only" htmlFor="counsel-input">
                پرسش حقوقی
              </label>
              <textarea
                id="counsel-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send(draft);
                  }
                }}
                rows={2}
                placeholder="مثلاً: مهلت اعتراض کارشناسی پرونده خلع ید تا کی است؟"
                className="min-h-11 flex-1 resize-none rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-navy"
              />
              <button
                type="submit"
                disabled={busy || !draft.trim()}
                className="flex size-11 shrink-0 items-center justify-center rounded-md bg-navy text-paper transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-50"
                aria-label="ارسال"
              >
                <ArrowUp className="size-4" />
              </button>
            </form>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl border border-line bg-surface p-4">
            <label className="text-sm font-medium text-navy">
              پرونده زمینه
              <select
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
              >
                <option value="">همه پرونده‌های دفتر</option>
                {cases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </label>
            {caseItem && (
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-muted">{caseItem.caseNumber || "بدون کلاسه"}</p>
                <p>{caseItem.court || "مرجع هنوز ثبت نشده"}</p>
                <Link
                  to="/cases/$id"
                  params={{ id: caseItem.id }}
                  className="inline-block pt-2 text-sm text-brass hover:underline"
                >
                  گشودن پرونده
                </Link>
              </div>
            )}
          </div>
          <div className="rounded-xl border border-line bg-surface p-4">
            <h2 className="mb-2 text-sm font-semibold text-navy">خلاصه کارتابل</h2>
            <div className="space-y-1.5 text-xs leading-6 text-muted">
              {officeBrief.split("\n").map((line, i) => (
                <p key={`${i}-${line}`}>{line}</p>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
