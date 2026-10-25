import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route$1 } from "./router-BY0Peqd6.mjs";
import { t as useShallow } from "../_libs/zustand.mjs";
import { c as useApp } from "./store-BqT8Nr3J.mjs";
import { t as AppShell } from "./AppShell-CCMsioPH.mjs";
import { t as PageHeader } from "./PageHeader-COnGV0eU.mjs";
import { n as StatusBadge } from "./Badges-Mo9jjYg7.mjs";
import { t as Attachments } from "./Attachments-BfpPLMQy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients_._id-B2xZ2MLZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientDetail() {
	const { id } = Route$1.useParams();
	const client = useApp((s) => s.clients.find((c) => c.id === id));
	const cases = useApp(useShallow((s) => s.cases.filter((c) => c.clientId === id)));
	const updateClient = useApp((s) => s.updateClient);
	const deleteClient = useApp((s) => s.deleteClient);
	const updateClientAttachments = useApp((s) => s.updateClientAttachments);
	const navigate = useNavigate();
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [fullName, setFullName] = (0, import_react.useState)(client?.fullName ?? "");
	const [mobile, setMobile] = (0, import_react.useState)(client?.mobile ?? "");
	const [address, setAddress] = (0, import_react.useState)(client?.address ?? "");
	const [email, setEmail] = (0, import_react.useState)(client?.email ?? "");
	const [notes, setNotes] = (0, import_react.useState)(client?.notes ?? "");
	if (!client) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "موکل یافت نشد."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/clients",
		className: "text-sm text-brass",
		children: "بازگشت"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/clients",
			className: "mb-3 inline-block text-sm text-muted hover:text-navy",
			children: "بازگشت به موکلین"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: client.fullName,
			subtitle: `${client.type === "individual" ? "شخص حقیقی" : "شخص حقوقی"} · از ${client.createdAt}`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setEditing((v) => !v),
					className: "inline-flex h-11 items-center rounded-md border border-line px-4 text-sm",
					children: editing ? "انصراف" : "ویرایش"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cases/new",
					search: { clientId: client.id },
					className: "inline-flex h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-paper",
					children: "تشکیل پرونده"
				})]
			})
		}),
		editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-6 max-w-xl space-y-3 rounded-xl border border-line bg-surface p-5",
			onSubmit: (e) => {
				e.preventDefault();
				updateClient(id, {
					fullName,
					mobile,
					address,
					email,
					notes
				});
				setEditing(false);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "نام",
					value: fullName,
					onChange: setFullName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "موبایل",
					value: mobile,
					onChange: setMobile,
					ltr: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "ایمیل",
					value: email,
					onChange: setEmail,
					ltr: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "نشانی",
					value: address,
					onChange: setAddress
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["یادداشت", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: notes,
						onChange: (e) => setNotes(e.target.value),
						className: "mt-1 min-h-24 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-md bg-navy px-5 text-sm text-paper",
					children: "ذخیره"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					label: "کد / شناسه",
					value: client.nationalCode || "—",
					ltr: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					label: "موبایل",
					value: client.mobile,
					ltr: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					label: "ایمیل",
					value: client.email || "—",
					ltr: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					label: "نشانی",
					value: client.address || "—"
				})
			]
		}),
		client.notes && !editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 rounded-xl border border-line bg-surface p-4 text-sm",
			children: client.notes
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Attachments, {
				files: client.attachments ?? [],
				onChange: (attachments) => updateClientAttachments(id, attachments)
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: cases.length > 0,
				title: cases.length ? "ابتدا پرونده‌های مرتبط را حذف یا منتقل کنید." : void 0,
				onClick: () => {
					if (window.confirm(`موکل «${client.fullName}» حذف شود؟`)) {
						deleteClient(id);
						navigate({ to: "/clients" });
					}
				},
				className: "h-10 rounded-md border border-danger px-4 text-sm text-danger disabled:opacity-40",
				children: "حذف موکل"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-semibold text-navy",
			children: "پرونده‌ها"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [cases.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "پرونده‌ای ثبت نشده است."
			}), cases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/cases/$id",
				params: { id: c.id },
				className: "flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 hover:border-navy/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: c.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: c.caseNumber
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })]
			}, c.id))]
		})
	] });
}
function Info({ label, value, ltr }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-medium",
			dir: ltr ? "ltr" : "rtl",
			children: value
		})]
	});
}
function Field({ label, value, onChange, ltr }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm font-medium",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			dir: ltr ? "ltr" : "rtl",
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
		})]
	});
}
//#endregion
export { ClientDetail as component };
