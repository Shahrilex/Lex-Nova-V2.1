import { t as createServerFn } from "./ssr.mjs";
import { i as retrieveSources, t as createServerRpc } from "./retrieve-Dy1RCxB0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/generate-draft-DTy0g8z_.js
var generateDraft_createServerFn_handler = createServerRpc({
	id: "9c9ed56734e1b977ac40a1f2871aee8f7ba95e5d6bbcb075f80a50e0e24c4545",
	name: "generateDraft",
	filename: "src/lib/generate-draft.ts"
}, (opts) => generateDraft.__executeServer(opts));
var generateDraft = createServerFn({ method: "POST" }).validator((d) => d).handler(generateDraft_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available"
	};
	const kinds = {
		petition: "دادخواست",
		defense: "لایحه دفاعیه",
		appeal: "لایحه تجدیدنظرخواهی",
		expert: "اعتراض به نظریه کارشناسی",
		execution: "درخواست اجرای حکم",
		settlement: "لایحه سازش"
	};
	const sourceBlock = retrieveSources(`${kinds[data.kind] ?? data.kind}\n${data.facts}`, 4).map((s) => `${s.article} — ${s.title}: ${s.summary}`).join("\n");
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 900,
			temperature: .3,
			messages: [{
				role: "system",
				content: "تو دستیار نگارش اوراق قضایی ایران هستی. فقط به فارسی رسمی بنویس. هر ادعای حقوقی باید به ماده یا رأی مشخص از منابع داده‌شده مستند شود. جایگزین وکیل نیستی؛ در پایان یک سطر هشدار بازبینی درج کن. ساختار دادگاه‌های ایران را رعایت کن."
			}, {
				role: "user",
				content: `نوع سند: ${kinds[data.kind] ?? data.kind}\nاطلاعات پرونده:\n${data.facts}\n\nمنابع:\n${sourceBlock || "—"}\nمتن کامل را آماده کن.`
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `xAI API error ${res.status}`
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "empty"
	};
	return {
		ok: true,
		text
	};
});
//#endregion
export { generateDraft_createServerFn_handler };
