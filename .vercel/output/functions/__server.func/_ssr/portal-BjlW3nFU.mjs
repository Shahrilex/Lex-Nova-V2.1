import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useApp } from "./store-Cn8itLM_.mjs";
import { t as AppShell } from "./AppShell-BuPZlujY.mjs";
import { n as Surface, t as PageHeader } from "./PageHeader-COnGV0eU.mjs";
import { n as StatusBadge } from "./Badges-BvDLyVDj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-BjlW3nFU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PortalPage() {
	const clients = useApp((s) => s.clients);
	const cases = useApp((s) => s.cases);
	const hearings = useApp((s) => s.hearings);
	const documents = useApp((s) => s.documents);
	const [clientId, setClientId] = (0, import_react.useState)(clients[0]?.id ?? "");
	const client = clients.find((c) => c.id === clientId);
	const mine = cases.filter((c) => c.clientId === clientId);
	const mineIds = new Set(mine.map((c) => c.id));
	const nextH = hearings.filter((h) => mineIds.has(h.caseId) && !h.result);
	const docs = documents.filter((d) => mineIds.has(d.caseId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "پورتال موکل",
			subtitle: "نمای ساده‌ای که موکل از وضعیت پرونده می‌بیند"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "mb-5 block max-w-sm text-sm font-medium",
			children: ["مشاهده به عنوان", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: clientId,
				onChange: (e) => setClientId(e.target.value),
				className: "mt-1 h-11 w-full rounded-md border border-line bg-surface px-3 text-sm",
				children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: c.id,
					children: c.fullName
				}, c.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
			className: "mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: ["سلام ", client?.fullName]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-lg font-semibold text-navy",
					children: "وضعیت پرونده‌های شما"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "اسناد محرمانه داخلی دفتر در این نما نمایش داده نمی‌شود."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 font-semibold text-navy",
						children: "پرونده‌ها"
					}),
					mine.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between rounded-md border border-line px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: c.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: c.caseNumber || "در حال ثبت"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })]
					}, c.id)),
					mine.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "پرونده‌ای نیست."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 font-semibold text-navy",
						children: "جلسات پیش رو"
					}),
					nextH.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-2 text-sm",
						children: [
							h.date,
							" · ",
							h.time,
							" — ",
							h.subject
						]
					}, h.id)),
					nextH.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "جلسه‌ای اعلام نشده."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
					className: "lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-3 font-semibold text-navy",
							children: "اسناد قابل مشاهده"
						}),
						docs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: [
								d.title,
								" · ",
								d.kind
							]
						}, d.id)),
						docs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "سندی برای نمایش نیست."
						})
					]
				})
			]
		})
	] });
}
//#endregion
export { PortalPage as component };
