import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Scale } from "../_libs/lucide-react.mjs";
import { c as useApp } from "./store-BqT8Nr3J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-DBL7cuiR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Verify() {
	const pending = useApp((s) => s.pendingMobile);
	const login = useApp((s) => s.login);
	const navigate = useNavigate();
	const [code, setCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [count, setCount] = (0, import_react.useState)(60);
	(0, import_react.useEffect)(() => {
		if (!pending) navigate({ to: "/" });
	}, [pending, navigate]);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setCount((c) => c > 0 ? c - 1 : 0), 1e3);
		return () => clearInterval(t);
	}, []);
	const submit = (e) => {
		e.preventDefault();
		if (!/^\d{4,6}$/.test(code)) {
			setError("کد باید ۴ تا ۶ رقم باشد.");
			return;
		}
		login(pending || "09121234567");
		navigate({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-navy px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-xl bg-surface p-8 shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-4 flex size-14 items-center justify-center rounded-lg bg-navy text-brass-soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-semibold text-navy",
							children: "تأیید هویت"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: ["کد نمایشی را وارد کنید", pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								" ",
								"(",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									dir: "ltr",
									children: pending
								}),
								")"
							] }) : null]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							dir: "ltr",
							inputMode: "numeric",
							value: code,
							onChange: (e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6)),
							className: "h-14 w-full rounded-md border border-line bg-paper px-3 text-center text-2xl tracking-[0.4em] outline-none focus:border-navy",
							placeholder: "1234",
							autoFocus: true
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "h-12 w-full rounded-md bg-navy text-sm font-medium text-paper hover:bg-navy-deep",
							children: "ورود به دفتر"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-center text-sm text-muted",
					children: count > 0 ? `ارسال مجدد تا ${count} ثانیه` : "می‌توانید دوباره کد بخواهید"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-brass hover:underline",
						children: "تغییر شماره"
					})
				})
			]
		})
	});
}
//#endregion
export { Verify as component };
