import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as toFaDigits } from "./utils-C78POfLB.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as planLabel, c as useApp } from "./store-CsDxLcvY.mjs";
import { t as AppShell } from "./AppShell-DU1UGjuf.mjs";
import { n as Surface, t as PageHeader } from "./PageHeader-COnGV0eU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BCzrpXOT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const user = useApp((s) => s.user);
	const office = useApp((s) => s.office);
	const clients = useApp((s) => s.clients);
	const cases = useApp((s) => s.cases);
	const resetDemo = useApp((s) => s.resetDemo);
	const updateOffice = useApp((s) => s.updateOffice);
	const [name, setName] = (0, import_react.useState)(office?.name ?? "");
	const [lawyerName, setLawyerName] = (0, import_react.useState)(office?.lawyerName ?? "");
	const [address, setAddress] = (0, import_react.useState)(office?.address ?? "");
	const [phone, setPhone] = (0, import_react.useState)(office?.phone ?? "");
	const [barNumber, setBarNumber] = (0, import_react.useState)(office?.barNumber ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "تنظیمات",
			subtitle: "مشخصات دفتر برای سربرگ لوایح و فضای کاری"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 font-semibold text-navy",
					children: "سربرگ دفتر"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-3",
					onSubmit: (e) => {
						e.preventDefault();
						updateOffice({
							name,
							lawyerName,
							address,
							phone,
							barNumber
						});
						toast.success("مشخصات دفتر ذخیره شد.");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["نام دفتر", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: name,
								onChange: (e) => setName(e.target.value),
								className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["وکیل مسئول", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: lawyerName,
								onChange: (e) => setLawyerName(e.target.value),
								className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["شماره پروانه", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: barNumber,
								onChange: (e) => setBarNumber(e.target.value),
								className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["تلفن", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								dir: "ltr",
								value: phone,
								onChange: (e) => setPhone(e.target.value),
								className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["نشانی", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: address,
								onChange: (e) => setAddress(e.target.value),
								className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "h-11 rounded-md bg-navy px-5 text-sm text-paper",
							children: "ذخیره سربرگ"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 font-semibold text-navy",
						children: "کاربر"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "نام",
						v: user?.fullName ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "نقش",
						v: user?.role ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "موبایل",
						v: user?.mobile ?? "—",
						ltr: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "پلن",
						v: planLabel[user?.plan ?? "pro"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "تعداد موکل",
						v: toFaDigits(clients.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "تعداد پرونده",
						v: toFaDigits(cases.length)
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 font-semibold text-navy",
						children: "پلن‌ها"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plan, {
								name: "آزاد",
								items: [
									"تا ۲۰ پرونده",
									"مواعد پایه",
									"یک کاربر"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plan, {
								name: "حرفه‌ای",
								items: [
									"پرونده نامحدود",
									"وجوه امانی",
									"ویرایشگر لایحه"
								],
								current: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plan, {
								name: "اولترا",
								items: [
									"پورتال موکل",
									"تحلیل ریسک",
									"همگام‌سازی ابری"
								]
							})
						]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted",
			children: "داده‌های این نسخه روی همین دستگاه ذخیره می‌شود. پیامک واقعی، حساب بانکی و همگام‌سازی ابری در نسخه سازمانی فعال می‌شود."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => {
				resetDemo();
				toast.success("داده‌های نمایشی بازنشانی شد.");
			},
			className: "mt-4 h-11 rounded-md border border-line px-4 text-sm",
			children: "بازنشانی داده‌های نمایشی"
		})
	] });
}
function Row({ k, v, ltr }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between border-b border-line py-2.5 text-sm last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			dir: ltr ? "ltr" : "rtl",
			children: v
		})]
	});
}
function Plan({ name, items, current }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-lg border p-4 ${current ? "border-navy bg-paper" : "border-line"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-semibold text-navy",
			children: name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 space-y-1 text-sm text-muted",
			children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: i }, i))
		})]
	});
}
//#endregion
export { SettingsPage as component };
