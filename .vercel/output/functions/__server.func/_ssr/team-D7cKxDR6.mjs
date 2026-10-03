import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useApp, r as memberRoleLabel } from "./store-CsDxLcvY.mjs";
import { t as AppShell } from "./AppShell-DU1UGjuf.mjs";
import { t as PageHeader } from "./PageHeader-COnGV0eU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team-D7cKxDR6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TeamPage() {
	const members = useApp((s) => s.members);
	const addMember = useApp((s) => s.addMember);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [mobile, setMobile] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("trainee");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "تیم دفتر",
			subtitle: "اعضای فضای کاری و سطح دسترسی نمایشی"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-5 grid gap-2 rounded-xl border border-line bg-surface p-4 sm:grid-cols-4",
			onSubmit: (e) => {
				e.preventDefault();
				if (!fullName.trim()) return;
				addMember({
					fullName,
					mobile,
					role
				});
				setFullName("");
				setMobile("");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: fullName,
					onChange: (e) => setFullName(e.target.value),
					placeholder: "نام",
					className: "h-11 rounded-md border border-line bg-paper px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					dir: "ltr",
					value: mobile,
					onChange: (e) => setMobile(e.target.value),
					placeholder: "موبایل",
					className: "h-11 rounded-md border border-line bg-paper px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: role,
					onChange: (e) => setRole(e.target.value),
					className: "h-11 rounded-md border border-line bg-paper px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "lawyer",
							children: "وکیل"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "trainee",
							children: "کارآموز"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "secretary",
							children: "منشی"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "accountant",
							children: "حسابدار"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-md bg-navy text-sm text-paper",
					children: "افزودن عضو"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-line bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[480px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "border-b border-line bg-paper text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "نام"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "نقش"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "موبایل"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-medium",
							children: m.fullName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: memberRoleLabel[m.role]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							dir: "ltr",
							children: m.mobile
						})
					]
				}, m.id)) })]
			})
		})
	] });
}
//#endregion
export { TeamPage as component };
