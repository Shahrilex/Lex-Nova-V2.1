import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as isIranMobile } from "./utils-C78POfLB.mjs";
import { d as Scale } from "../_libs/lucide-react.mjs";
import { c as useApp } from "./store-Cn8itLM_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BAH-lIUt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const user = useApp((s) => s.user);
	const setPending = useApp((s) => s.setPendingMobile);
	const login = useApp((s) => s.login);
	const navigate = useNavigate();
	const [mobile, setMobile] = (0, import_react.useState)("09121234567");
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const desktopParams = new URLSearchParams(window.location.search);
		const desktopMode = desktopParams.get("desktop") === "1";
		const requestedRoute = desktopParams.get("desktopRoute");
		const desktopRoute = requestedRoute?.startsWith("/") && !requestedRoute.startsWith("//") && !requestedRoute.includes("\\") && requestedRoute !== "/" ? requestedRoute : "/dashboard";
		if (desktopMode && !user) {
			login("09121234567");
			navigate({
				to: desktopRoute,
				replace: true
			});
			return;
		}
		if (user) navigate({
			to: desktopMode ? desktopRoute : "/dashboard",
			replace: desktopMode
		});
	}, [
		user,
		login,
		navigate
	]);
	const submit = (e) => {
		e.preventDefault();
		const cleaned = mobile.replace(/\D/g, "");
		if (!isIranMobile(cleaned)) {
			setError("شماره موبایل ایرانی معتبر وارد کنید.");
			return;
		}
		setPending(cleaned);
		navigate({ to: "/verify" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-0 opacity-[0.07]",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-24 -left-16 size-80 rounded-full border border-brass-soft" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-20 -right-10 size-96 rounded-full border border-brass-soft" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md rounded-xl bg-surface p-8 shadow-xl",
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
							children: "Jurist Assistant"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "دستیار حقوقدان · مدیریت دفتر وکالت"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-sm font-medium",
							children: "شماره موبایل"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							dir: "ltr",
							value: mobile,
							onChange: (e) => setMobile(e.target.value),
							className: "h-12 w-full rounded-md border border-line bg-paper px-3 text-left outline-none transition-colors focus:border-navy",
							placeholder: "09123456789"
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-danger",
							children: error
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-12 w-full rounded-md bg-navy text-sm font-medium text-paper hover:bg-navy-deep",
						children: "دریافت کد تأیید"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-center text-xs text-muted",
					children: "نسخه نمایشی. کد تأیید واقعی ارسال نمی‌شود؛ هر کد ۴ تا ۶ رقمی پذیرفته است."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							login("09121234567");
							navigate({ to: "/dashboard" });
						},
						className: "text-sm text-brass hover:underline",
						children: "ورود سریع به داشبورد نمایشی"
					})
				})
			]
		})]
	});
}
//#endregion
export { Home as component };
