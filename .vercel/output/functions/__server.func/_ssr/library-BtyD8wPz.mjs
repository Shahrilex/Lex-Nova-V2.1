import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AppShell } from "./AppShell-BuPZlujY.mjs";
import { t as PageHeader } from "./PageHeader-COnGV0eU.mjs";
import { n as sourceKindLabel, t as legalLibrary } from "./legal-library-Do-81LeP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-BtyD8wPz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LibraryPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("all");
	const list = (0, import_react.useMemo)(() => legalLibrary.filter((s) => {
		return (!q || s.title.includes(q) || s.article.includes(q) || s.summary.includes(q)) && (kind === "all" || s.kind === kind);
	}), [q, kind]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "منابع حقوقی",
			subtitle: "مواد، آیین دادرسی و آرای وحدت رویه مورد استناد دفتر"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "جستجو در عنوان، ماده یا متن",
				className: "h-11 min-w-48 flex-1 rounded-md border border-line bg-surface px-3 text-sm"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: kind,
				onChange: (e) => setKind(e.target.value),
				className: "h-11 rounded-md border border-line bg-surface px-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "همه انواع"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "law",
						children: "قانون"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "procedure",
						children: "آیین دادرسی"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "unity",
						children: "وحدت رویه"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "opinion",
						children: "نظامات"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [list.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-line bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-navy",
							children: s.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-paper px-2 py-0.5 text-xs text-muted",
							children: sourceKindLabel[s.kind]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-brass",
						children: s.article
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-7",
						children: s.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: s.citation
					})
				]
			}, s.id)), list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "p-8 text-center text-sm text-muted",
				children: "منبعی یافت نشد."
			})]
		})
	] });
}
//#endregion
export { LibraryPage as component };
