import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useApp } from "./store-CsDxLcvY.mjs";
import { t as AppShell } from "./AppShell-DU1UGjuf.mjs";
import { t as PageHeader } from "./PageHeader-COnGV0eU.mjs";
import { t as DeadlineBadge } from "./Badges-SS_vEGQS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deadlines-B7TeyGDh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DeadlinesPage() {
	const deadlines = useApp((s) => s.deadlines);
	const cases = useApp((s) => s.cases);
	const toggle = useApp((s) => s.toggleDeadline);
	const [filter, setFilter] = (0, import_react.useState)("open");
	const list = (0, import_react.useMemo)(() => deadlines.filter((d) => {
		if (filter === "open") return !d.isCompleted;
		if (filter === "urgent") return d.isUrgent && !d.isCompleted;
		if (filter === "done") return d.isCompleted;
		return true;
	}), [deadlines, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "مواعد",
			subtitle: "مهلت‌های قانونی، داخلی و مالی دفتر",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/tools",
				className: "inline-flex h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-paper",
				children: "محاسبه موعد"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [
				["open", "باز"],
				["urgent", "فوری"],
				["done", "انجام‌شده"],
				["all", "همه"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setFilter(id),
				className: `h-10 rounded-full px-4 text-sm ${filter === id ? "bg-navy text-paper" : "border border-line bg-surface"}`,
				children: label
			}, id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [list.map((d) => {
				const c = cases.find((x) => x.id === d.caseId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `rounded-xl border bg-surface p-4 ${d.isUrgent && !d.isCompleted ? "border-danger/40" : "border-line"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `font-medium ${d.isCompleted ? "text-muted line-through" : ""}`,
								children: d.title
							}),
							c && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cases/$id",
								params: { id: c.id },
								className: "text-sm text-brass hover:underline",
								children: c.title
							}),
							d.legalArticle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: d.legalArticle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadlineBadge, { type: d.type })
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: d.isUrgent && !d.isCompleted ? "font-semibold text-danger" : "text-navy",
								children: d.dueDate
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggle(d.id),
								className: "mt-2 text-xs text-muted hover:text-navy",
								children: d.isCompleted ? "بازگردانی" : "علامت انجام"
							})]
						})]
					})
				}, d.id);
			}), list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "p-8 text-center text-sm text-muted",
				children: "موعدی در این فهرست نیست."
			})]
		})
	] });
}
//#endregion
export { DeadlinesPage as component };
