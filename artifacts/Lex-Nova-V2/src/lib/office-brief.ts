import type { CaseItem, Client, DeadlineItem, Hearing, NoteItem, Party } from "./types";
import { caseTypeLabel, partyRoleLabel, statusLabel } from "./seed";

export function buildOfficeBrief(input: {
  cases: CaseItem[];
  clients: Client[];
  deadlines: DeadlineItem[];
  parties: Party[];
  notes: NoteItem[];
  hearings: Hearing[];
  selectedCaseId?: string;
}) {
  const lines: string[] = [];
  const selected = input.cases.find((c) => c.id === input.selectedCaseId);
  if (selected) {
    const client = input.clients.find((c) => c.id === selected.clientId);
    lines.push(
      `پرونده منتخب: ${selected.title} | کلاسه ${selected.caseNumber || "—"} | ${selected.court || "بدون مرجع"} ${selected.branch} | ${statusLabel[selected.status] ?? selected.status} | ${caseTypeLabel[selected.caseType] ?? ""}`,
    );
    lines.push(`موکل: ${client?.fullName ?? "نامشخص"}`);
    if (selected.description) lines.push(`شرح: ${selected.description}`);
    if (selected.claimAmount && selected.claimAmount !== "0") {
      lines.push(`خواسته: ${selected.claimAmount} ریال`);
    }
    const parties = input.parties.filter((p) => p.caseId === selected.id);
    if (parties.length) {
      lines.push(
        "طرفین: " +
          parties
            .map((p) => `${p.fullName} (${partyRoleLabel[p.role] ?? p.role})`)
            .join("؛ "),
      );
    }
    const notes = input.notes.filter((n) => n.caseId === selected.id).slice(0, 2);
    for (const n of notes) lines.push(`یادداشت داخلی: ${n.body}`);
  }

  const urgent = input.deadlines.filter((d) => !d.isCompleted).slice(0, 6);
  if (urgent.length) {
    lines.push("مواعد باز دفتر:");
    for (const d of urgent) {
      const cse = input.cases.find((c) => c.id === d.caseId);
      lines.push(
        `- ${d.title} | ${cse?.title ?? d.caseId} | سررسید ${d.dueDate}${d.isUrgent ? " | فوری" : ""}${d.legalArticle ? ` | ${d.legalArticle}` : ""}`,
      );
    }
  }

  const hearings = input.hearings.filter((h) => !h.result).slice(0, 3);
  if (hearings.length) {
    lines.push("جلسات پیش‌رو:");
    for (const h of hearings) {
      const cse = input.cases.find((c) => c.id === h.caseId);
      lines.push(`- ${h.date} ${h.time} | ${h.subject} | ${cse?.title ?? ""} | ${h.branch}`);
    }
  }

  return lines.join("\n").slice(0, 2800);
}
