import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useApp, i as partyRoleLabel } from "./store-BqT8Nr3J.mjs";
import { t as AppShell } from "./AppShell-CCMsioPH.mjs";
import { n as Surface, t as PageHeader } from "./PageHeader-COnGV0eU.mjs";
import { n as lookupCode, t as findConflicts } from "./conflict-CUnjNDYQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/conflict-BXzA_UVZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ConflictPage() {
	const clients = useApp((s) => s.clients);
	const parties = useApp((s) => s.parties);
	const cases = useApp((s) => s.cases);
	const hits = findConflicts(clients, parties, cases);
	const [code, setCode] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "تعارض منافع",
			subtitle: "بررسی کد ملی موکل در برابر طرفین پرونده‌های فعال"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
			className: "mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-2 sm:flex-row",
				onSubmit: (e) => {
					e.preventDefault();
					setResult(lookupCode(code.trim(), clients, parties, cases));
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					dir: "ltr",
					value: code,
					onChange: (e) => setCode(e.target.value),
					placeholder: "کد ملی یا شناسه ملی",
					className: "h-11 flex-1 rounded-md border border-line bg-paper px-3 text-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-md bg-navy px-5 text-sm text-paper",
					children: "استعلام"
				})]
			}), result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-2 text-sm",
				children: [
					result.clients.length === 0 && result.parties.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-ok",
						children: "در سوابق دفتر برخوردی یافت نشد."
					}),
					result.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"موکل:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/clients/$id",
							params: { id: c.id },
							className: "text-brass",
							children: c.fullName
						})
					] }, c.id)),
					result.parties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"طرف پرونده «",
						p.caseTitle,
						"»: ",
						p.fullName,
						" (",
						partyRoleLabel[p.role],
						")"
					] }, p.id))
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-semibold text-navy",
			children: "موارد شناسایی‌شده"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [hits.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "تعارض بازی ثبت نشده است."
			}), hits.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-danger/30 bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-danger",
						children: h.reason
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm",
						children: [
							h.nameA,
							" و ",
							h.nameB,
							h.caseTitle ? ` · پرونده ${h.caseTitle}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						dir: "ltr",
						children: h.nationalCode
					})
				]
			}, `${h.nationalCode}-${i}`))]
		})
	] });
}
//#endregion
export { ConflictPage as component };
