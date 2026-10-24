import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as UserPlus, f as Pencil, s as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as useApp, r as memberRoleLabel } from "./store-Cn8itLM_.mjs";
import { t as AppShell } from "./AppShell-BuPZlujY.mjs";
import { n as Surface, t as PageHeader } from "./PageHeader-COnGV0eU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team-Bqak8dez.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyMember = {
	fullName: "",
	mobile: "",
	role: "trainee"
};
function TeamPage() {
	const members = useApp((s) => s.members);
	const addMember = useApp((s) => s.addMember);
	const updateMember = useApp((s) => s.updateMember);
	const deleteMember = useApp((s) => s.deleteMember);
	const [form, setForm] = (0, import_react.useState)(emptyMember);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const save = (event) => {
		event.preventDefault();
		if (!form.fullName.trim()) return toast.error("نام عضو را وارد کنید.");
		if (editing) {
			updateMember(editing.id, form);
			toast.success("اطلاعات عضو ویرایش شد.");
			setEditing(null);
		} else {
			addMember(form);
			toast.success("عضو جدید افزوده شد.");
		}
		setForm(emptyMember);
	};
	const beginEdit = (member) => {
		setEditing(member);
		setForm({
			fullName: member.fullName,
			mobile: member.mobile,
			role: member.role
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "تیم دفتر",
			subtitle: "افزودن، ویرایش و مدیریت اعضای فضای کاری"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Surface, {
			className: "mb-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				onSubmit: save,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.fullName,
						onChange: (e) => setForm({
							...form,
							fullName: e.target.value
						}),
						placeholder: "نام و نام خانوادگی",
						className: "h-11 rounded-md border border-line bg-paper px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						dir: "ltr",
						value: form.mobile,
						onChange: (e) => setForm({
							...form,
							mobile: e.target.value
						}),
						placeholder: "شماره موبایل",
						className: "h-11 rounded-md border border-line bg-paper px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: form.role,
						onChange: (e) => setForm({
							...form,
							role: e.target.value
						}),
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-navy px-4 text-sm font-medium text-paper",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), editing ? "ذخیره تغییرات" : "افزودن عضو"]
						}), editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setEditing(null);
								setForm(emptyMember);
							},
							className: "h-11 rounded-md border border-line px-3 text-sm",
							children: "انصراف"
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-line bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[600px] text-sm",
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left font-medium",
							children: "عملیات"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-medium",
							children: member.fullName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: memberRoleLabel[member.role]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							dir: "ltr",
							children: member.mobile || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => beginEdit(member),
									className: "inline-flex h-10 items-center gap-1 rounded-md border border-line px-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "ویرایش"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										if (window.confirm(`عضو «${member.fullName}» حذف شود؟`)) {
											deleteMember(member.id);
											toast.success("عضو حذف شد.");
										}
									},
									className: "inline-flex h-10 items-center gap-1 rounded-md border border-danger/30 px-3 text-sm text-danger",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "حذف"]
								})]
							})
						})
					]
				}, member.id)) })]
			})
		})
	] });
}
//#endregion
export { TeamPage as component };
