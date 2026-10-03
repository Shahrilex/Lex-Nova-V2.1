import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as isIranMobile, r as isIranLegalId } from "./utils-C78POfLB.mjs";
import { c as useApp } from "./store-CsDxLcvY.mjs";
import { t as AppShell } from "./AppShell-DU1UGjuf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients.new-4fyRm7J-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewClient() {
	const addClient = useApp((s) => s.addClient);
	const navigate = useNavigate();
	const [type, setType] = (0, import_react.useState)("individual");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [nationalCode, setNationalCode] = (0, import_react.useState)("");
	const [mobile, setMobile] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [msg, setMsg] = (0, import_react.useState)("");
	const submit = (e) => {
		e.preventDefault();
		if (!fullName.trim()) {
			setMsg("نام موکل را وارد کنید.");
			return;
		}
		if (mobile && !isIranMobile(mobile)) {
			setMsg("شماره موبایل ایرانی معتبر نیست.");
			return;
		}
		if (nationalCode && !isIranLegalId(nationalCode, type)) {
			setMsg(type === "company" ? "شناسه ملی باید ۱۱ رقم باشد." : "کد ملی از نظر رقم کنترل نامعتبر است.");
			return;
		}
		const res = addClient({
			fullName,
			nationalCode,
			mobile,
			type,
			address,
			email,
			notes
		});
		if (!res.ok) {
			setMsg(res.message);
			return;
		}
		navigate({
			to: "/clients/$id",
			params: { id: res.id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/clients",
			className: "mb-3 inline-block text-sm text-muted hover:text-navy",
			children: "بازگشت"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-5 text-2xl font-semibold text-navy",
			children: "ثبت موکل جدید"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "max-w-xl space-y-4 rounded-lg border border-line bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							checked: type === "individual",
							onChange: () => setType("individual")
						}), "حقیقی"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							checked: type === "company",
							onChange: () => setType("company")
						}), "حقوقی"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: type === "individual" ? "نام و نام خانوادگی" : "نام شرکت",
					value: fullName,
					onChange: setFullName,
					required: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: type === "individual" ? "کد ملی" : "شناسه ملی",
					value: nationalCode,
					onChange: setNationalCode,
					ltr: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "موبایل",
					value: mobile,
					onChange: setMobile,
					ltr: true,
					required: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "نشانی",
					value: address,
					onChange: setAddress
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "ایمیل",
					value: email,
					onChange: setEmail,
					ltr: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1 block text-sm font-medium",
					children: "یادداشت"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: notes,
					onChange: (e) => setNotes(e.target.value),
					className: "min-h-24 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-navy"
				})] }),
				msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-md bg-danger/10 px-3 py-2 text-sm text-danger",
					children: msg
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-11 rounded-md bg-navy px-5 text-sm font-medium text-paper",
						children: "ثبت"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/clients",
						className: "inline-flex h-11 items-center rounded-md border border-line px-5 text-sm",
						children: "انصراف"
					})]
				})
			]
		})
	] });
}
function Field({ label, value, onChange, ltr, required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "mb-1 block text-sm font-medium",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		dir: ltr ? "ltr" : "rtl",
		required,
		value,
		onChange: (e) => onChange(e.target.value),
		className: "h-11 w-full rounded-md border border-line bg-paper px-3 text-sm outline-none focus:border-navy"
	})] });
}
//#endregion
export { NewClient as component };
