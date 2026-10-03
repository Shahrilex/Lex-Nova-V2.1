import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useApp, t as caseTypeLabel } from "./store-CsDxLcvY.mjs";
import { t as AppShell } from "./AppShell-DU1UGjuf.mjs";
import { n as StatusBadge } from "./Badges-SS_vEGQS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cases-D4l69Oa8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CasesPage() {
	const cases = useApp((s) => s.cases);
	const clients = useApp((s) => s.clients);
	const deadlines = useApp((s) => s.deadlines);
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [kind, setKind] = (0, import_react.useState)("all");
	const list = (0, import_react.useMemo)(() => cases.filter((c) => {
		const client = clients.find((x) => x.id === c.clientId);
		return (!q || c.title.includes(q) || c.caseNumber.includes(q) || (client?.fullName ?? "").includes(q)) && (status === "all" || c.status === status) && (kind === "all" || c.caseType === kind);
	}), [
		cases,
		clients,
		q,
		status,
		kind
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold text-navy",
				children: "پرونده‌ها"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [list.length, " پرونده"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/cases/new",
				className: "inline-flex h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-paper",
				children: "تشکیل پرونده"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "جستجو عنوان، کلاسه، موکل",
					className: "h-11 min-w-48 flex-1 rounded-md border border-line bg-surface px-3 text-sm outline-none focus:border-navy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: status,
					onChange: (e) => setStatus(e.target.value),
					className: "h-11 rounded-md border border-line bg-surface px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "همه وضعیت‌ها"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "active",
							children: "فعال"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "draft",
							children: "پیش‌نویس"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "closed",
							children: "مختومه"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: kind,
					onChange: (e) => setKind(e.target.value),
					className: "h-11 rounded-md border border-line bg-surface px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "همه انواع"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "civil",
							children: "حقوقی"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "criminal",
							children: "کیفری"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "family",
							children: "خانواده"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "commercial",
							children: "تجاری"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "administrative",
							children: "اداری"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [list.map((c) => {
				const client = clients.find((x) => x.id === c.clientId);
				const openD = deadlines.filter((d) => d.caseId === c.id && !d.isCompleted).length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cases/$id",
					params: { id: c.id },
					className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-surface p-4 hover:border-navy/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: caseTypeLabel[c.caseType]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							client?.fullName,
							" · ",
							c.caseNumber || "بدون کلاسه",
							" · ",
							c.court || "مرجع نامشخص"
						]
					})] }), openD > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-danger/10 px-2.5 py-1 text-xs text-danger",
						children: [openD, " موعد باز"]
					})]
				}, c.id);
			}), list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "p-8 text-center text-sm text-muted",
				children: "پرونده‌ای یافت نشد."
			})]
		})
	] });
}
//#endregion
export { CasesPage as component };
