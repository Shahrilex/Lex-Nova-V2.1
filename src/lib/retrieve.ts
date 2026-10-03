import { legalLibrary, type LegalSource } from "./legal-library";
import { deadlineRules, type DeadlineRule } from "./deadline-engine";
import { parseJalali } from "./jalali";

const STOP = new Set([
  "از",
  "تا",
  "به",
  "در",
  "با",
  "که",
  "را",
  "این",
  "آن",
  "برای",
  "یک",
  "هم",
  "یا",
  "اگر",
  "چه",
  "است",
  "شود",
  "کن",
  "کنم",
  "کنید",
  "بگو",
  "بررسی",
  "گام",
  "بعدی",
  "پرونده",
  "مطالبه",
  "چگونه",
  "کنم",
]);

const BOOST: { keys: string[]; ids: string[] }[] = [
  { keys: ["تجدیدنظر", "۳۳۶", "336"], ids: ["s1", "s2"] },
  { keys: ["واخواهی", "غیابی", "۳۰۶"], ids: ["s4", "s2"] },
  { keys: ["کارشناس", "کارشناسی", "۲۶۰"], ids: ["s3"] },
  { keys: ["چک", "تأخیر", "۷۳۳", "733"], ids: ["s5", "s13"] },
  { keys: ["خلع", "غصب", "ید"], ids: ["s7"] },
  { keys: ["طلاق", "سازش", "خانواده"], ids: ["s8", "s16"] },
  { keys: ["تمبر", "۱۰۳", "103", "مالیات"], ids: ["s6"] },
  { keys: ["امانی", "وجوه", "حساب"], ids: ["s11"] },
  { keys: ["نقص", "دادخواست"], ids: ["s12", "s14"] },
  { keys: ["فرجام", "دیوان"], ids: ["s10"] },
  { keys: ["مهریه", "نفقه", "حضانت"], ids: ["s16", "s17"] },
  { keys: ["اثبات", "دلیل", "۱۲۵۷"], ids: ["s15"] },
  { keys: ["التزام", "وجه التزام", "قرارداد"], ids: ["s9", "s18"] },
  { keys: ["دستور", "موقت", "تأمین"], ids: ["s19"] },
  { keys: ["مسئولیت", "خسارت"], ids: ["s20"] },
];

export function tokenize(query: string) {
  return query
    .split(/[^\u0600-\u06FFa-zA-Z0-9۰-۹٠-٩]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2 && !STOP.has(t));
}

export function retrieveSources(query: string, limit = 5): LegalSource[] {
  const tokens = tokenize(query);
  const boosted = new Set<string>();
  for (const row of BOOST) {
    if (row.keys.some((k) => query.includes(k))) {
      for (const id of row.ids) boosted.add(id);
    }
  }
  const scored = legalLibrary.map((s) => {
    const hay = `${s.title} ${s.article} ${s.summary} ${s.citation}`;
    let score = boosted.has(s.id) ? 8 : 0;
    for (const t of tokens) {
      if (hay.includes(t)) score += t.length > 3 ? 2 : 1;
    }
    return { s, score };
  });
  return scored
    .filter((x) => x.score > 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.s);
}

export function matchDeadlineRule(query: string): DeadlineRule | undefined {
  const hits = deadlineRules
    .map((r) => {
      let score = 0;
      if (query.includes(r.title)) score += 5;
      if (query.includes(r.code)) score += 4;
      const keys = r.title.split(/\s+/);
      for (const k of keys) if (k.length > 2 && query.includes(k)) score += 1;
      return { r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return hits[0]?.r;
}

export function extractNoticeDate(query: string) {
  const m = query.match(/(\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})|([۰-۹]{4}[\/\-][۰-۹]{1,2}[\/\-][۰-۹]{1,2})/);
  if (!m) return null;
  return parseJalali(m[0]) ? m[0] : null;
}
