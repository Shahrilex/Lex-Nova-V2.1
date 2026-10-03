import { n as TSS_SERVER_FUNCTION, r as getServerFnById } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/print-3TRRD6gQ.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var amp = String.fromCharCode(38);
function escapeHtml(s) {
	return s.replaceAll("&", `${amp}amp;`).replaceAll("<", `${amp}lt;`).replaceAll(">", `${amp}gt;`).replaceAll("\"", `${amp}quot;`);
}
function printLegalDoc(opts) {
	const w = window.open("", "_blank", "noopener,noreferrer");
	if (!w) return false;
	const body = escapeHtml(opts.body).replace(/\n/g, "<br/>");
	const meta = opts.meta ? `<p class="meta">${escapeHtml(opts.meta)}</p>` : "";
	const bar = opts.barNumber ? ` · پروانه ${escapeHtml(opts.barNumber)}` : "";
	w.document.write(`<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8"/>
  <title>${escapeHtml(opts.heading)}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700&display=swap"/>
  <style>
    @page { size: A4; margin: 18mm 16mm; }
    body { font-family: Vazirmatn, Tahoma, sans-serif; color: #1c1914; line-height: 2; font-size: 12.5pt; }
    header { border-bottom: 2px solid #0c1e33; padding-bottom: 10px; margin-bottom: 18px; }
    .office { font-size: 11pt; color: #6b6458; }
    h1 { font-size: 16pt; margin: 8px 0 4px; color: #0c1e33; }
    .meta { font-size: 10.5pt; color: #6b6458; }
    .body { white-space: normal; }
    footer { margin-top: 28px; font-size: 10pt; color: #6b6458; }
  </style>
</head>
<body>
  <header>
    <p class="office">${escapeHtml(opts.officeName)} · ${escapeHtml(opts.lawyerName)}${bar}</p>
    <h1>${escapeHtml(opts.heading)}</h1>
    ${meta}
  </header>
  <div class="body">${body}</div>
  <footer>این متن پیش‌نویس دفتر است و باید پیش از تقدیم به مرجع قضایی بازبینی شود.</footer>
  <script>window.onload = function () { window.print(); };<\/script>
</body>
</html>`);
	w.document.close();
	return true;
}
async function copyText(text) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}
//#endregion
export { createSsrRpc as n, printLegalDoc as r, copyText as t };
