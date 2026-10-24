import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useApp } from "./store-Cn8itLM_.mjs";
import { t as AppShell } from "./AppShell-BuPZlujY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients-I32YjzxV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientsPage() {
	const clients = useApp((s) => s.clients);
	const cases = useApp((s) => s.cases);
	const [q, setQ] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("all");
	const list = (0, import_react.useMemo)(() => clients.filter((c) => {
		const hit = !q || c.fullName.includes(q) || c.nationalCode.includes(q) || c.mobile.includes(q);
		const t = type === "all" || c.type === type;
		return hit && t;
	}), [
		clients,
		q,
		type
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold text-navy",
				children: "موکلین"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [list.length, " مورد"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/clients/new",
				className: "inline-flex h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-paper",
				children: "موکل جدید"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "جستجو نام، کد ملی، موبایل",
				className: "h-11 min-w-48 flex-1 rounded-md border border-line bg-surface px-3 text-sm outline-none focus:border-navy"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: type,
				onChange: (e) => setType(e.target.value),
				className: "h-11 rounded-md border border-line bg-surface px-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "همه انواع"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "individual",
						children: "حقیقی"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "company",
						children: "حقوقی"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-x-auto rounded-lg border border-line bg-surface",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[640px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "border-b border-line bg-paper text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "نام"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "کد / شناسه"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "موبایل"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "نوع"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "پرونده"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line last:border-0 hover:bg-paper/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/clients/$id",
								params: { id: c.id },
								className: "font-medium text-navy hover:underline",
								children: c.fullName
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							dir: "ltr",
							children: c.nationalCode
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							dir: "ltr",
							children: c.mobile
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: c.type === "individual" ? "حقیقی" : "حقوقی"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: cases.filter((x) => x.clientId === c.id).length
						})
					]
				}, c.id)) })]
			}), list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "p-8 text-center text-sm text-muted",
				children: "موردی یافت نشد."
			})]
		})
	] });
}
//#endregion
export { ClientsPage as component };
