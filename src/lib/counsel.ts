import { createServerFn } from "@tanstack/react-start";
import { calculateDeadline } from "./deadline-engine";
import { extractNoticeDate, matchDeadlineRule, retrieveSources } from "./retrieve";
import { todayJalali } from "./utils";

export type CounselChat = { role: "user" | "assistant"; content: string };

export type CounselCitation = {
  id: string;
  title: string;
  article: string;
  summary: string;
};

export type CounselOk = {
  ok: true;
  text: string;
  citations: CounselCitation[];
  source: "model" | "library";
};

export type CounselErr = { ok: false; error: string };

function composeLocalCounsel(query: string, officeBrief: string): { text: string; citations: CounselCitation[] } {
  const sources = retrieveSources(query, 4);
  const citations: CounselCitation[] = sources.map((s) => ({
    id: s.id,
    title: s.title,
    article: s.article,
    summary: s.summary,
  }));
  const blocks: string[] = [];
  const rule = matchDeadlineRule(query);
  const notice = extractNoticeDate(query) ?? todayJalali();
  const wantsDeadline = /مهلت|موعد|سررسید|ابلاغ|اعتراض|تجدیدنظر|واخواهی|فرجام|نقص/.test(query);

  if (rule && wantsDeadline) {
    const abroad = /خارج/.test(query);
    const calc = calculateDeadline({ ruleCode: rule.code, noticeDate: notice, abroad });
    if (calc.ok) {
      blocks.push(
        `مهلت «${rule.title}» با مبدأ ${notice} تا ${calc.dueDate} است. ${rule.article}. روز ابلاغ جزء مهلت نیست (ماده ۴۴۵ ق.آ.د.م).`,
      );
    }
  } else if (sources[0]) {
    blocks.push(`${sources[0].title}: ${sources[0].summary} (${sources[0].article})`);
  }

  const selectedLine = officeBrief.split("\n").find((l) => l.startsWith("پرونده منتخب:"));
  const dueLines = officeBrief
    .split("\n")
    .filter((l) => l.startsWith("- ") && /فوری|سررسید/.test(l))
    .slice(0, 3);
  if (selectedLine || dueLines.length) {
    blocks.push("ارتباط با کارتابل دفتر:");
    if (selectedLine) blocks.push(selectedLine.replace("پرونده منتخب: ", ""));
    for (const l of dueLines) blocks.push(l);
  }

  if (/دادخواست|لایحه|دفاعیه|پیش‌نویس|بنویس/.test(query)) {
    blocks.push(
      "برای متن کامل قابل تقدیم از ویرایشگر لایحه با همین پرونده استفاده کنید: خطاب مرجع، طرفین، جهات با شماره ماده، و نتیجه‌گیری.",
    );
  }

  if (/تعارض/.test(query)) {
    blocks.push(
      "پیش از پذیرش موکل جدید، کد ملی را با موکلین و طرف مقابل پرونده‌های فعال بسنجید. اگر یک شخص هم موکل باشد و هم خوانده پرونده دیگر، پذیرش ممنوع است مگر با رضایت آگاهانه و رعایت نظامات کانون.",
    );
  }

  if (blocks.length === 0) {
    blocks.push(
      "موضوع را با نوع اقدام (تجدیدنظر، واخواهی، کارشناسی، دادخواست) و در صورت امکان تاریخ ابلاغ بنویسید تا محاسبه دقیق‌تری ارائه شود.",
    );
  }

  blocks.push("این پاسخ جایگزین تشخیص وکیل نیست و باید با ابلاغ واقعی تطبیق داده شود.");
  return { text: blocks.join("\n\n"), citations };
}

export const askCounsel = createServerFn({ method: "POST" })
  .validator((d: { query: string; officeBrief: string; messages: CounselChat[] }) => d)
  .handler(async ({ data }): Promise<CounselOk | CounselErr> => {
    const query = data.query.trim().slice(0, 2000);
    if (!query) return { ok: false, error: "متن پرسش خالی است." };

    const local = composeLocalCounsel(query, data.officeBrief);
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: true, text: local.text, citations: local.citations, source: "library" };
    }

    const sources = retrieveSources(query, 5);
    const sourceBlock = sources
      .map((s) => `${s.article} | ${s.title}: ${s.summary} (${s.citation})`)
      .join("\n");
    const history = data.messages.slice(-8).map((m) => ({
      role: m.role,
      content: m.content.slice(0, 2500),
    }));

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 900,
          temperature: 0.25,
          messages: [
            {
              role: "system",
              content:
                "تو دستیار حقوقدان یک دفتر وکالت در ایران هستی. فقط فارسی رسمی و موجز بنویس. هر حکم را به ماده یا رأی موجود در منابع داده‌شده مستند کن. اگر منبع کافی نیست صریحاً بگو و حدس نزن. ساختار مراجع قضایی ایران را رعایت کن. جایگزین وکیل نیستی. اگر مهلت خواسته شد شمارش را گام‌به‌گام (روز ابلاغ جزء مهلت نیست، انتقال به روز غیرتعطیل) توضیح بده. در پایان یک سطر هشدار بازبینی بیاور.",
            },
            {
              role: "user",
              content: `منابع دفتر:\n${sourceBlock || "منبع منطبق یافت نشد."}\n\nخلاصه دفتر:\n${data.officeBrief || "—"}`,
            },
            ...history,
          ],
        }),
      });
      if (!res.ok) {
        return { ok: true, text: local.text, citations: local.citations, source: "library" };
      }
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const text = body.choices?.[0]?.message?.content?.trim() ?? "";
      if (!text) {
        return { ok: true, text: local.text, citations: local.citations, source: "library" };
      }
      return {
        ok: true,
        text,
        citations: local.citations,
        source: "model",
      };
    } catch {
      return { ok: true, text: local.text, citations: local.citations, source: "library" };
    }
  });
