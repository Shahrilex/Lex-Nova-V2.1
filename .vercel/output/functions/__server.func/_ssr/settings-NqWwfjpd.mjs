import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as toFaDigits } from "./utils-C78POfLB.mjs";
import { _ as HardDriveUpload, b as Download, p as MonitorDown, x as Database } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as planLabel, c as useApp } from "./store-Cn8itLM_.mjs";
import { t as AppShell } from "./AppShell-BuPZlujY.mjs";
import { n as Surface, t as PageHeader } from "./PageHeader-COnGV0eU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-NqWwfjpd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var collectionFields = [
	"clients",
	"cases",
	"parties",
	"deadlines",
	"timeline",
	"documents",
	"notes",
	"transactions",
	"petitions",
	"hearings",
	"members",
	"notices",
	"chat"
];
function isLexNovaBackup(value) {
	if (!value || typeof value !== "object") return false;
	const candidate = value;
	if (candidate.version !== 1 || !candidate.office || typeof candidate.office !== "object") return false;
	const office = candidate.office;
	if (![
		"name",
		"lawyerName",
		"address",
		"phone",
		"barNumber"
	].every((key) => typeof office[key] === "string")) return false;
	if (typeof candidate.exportedAt !== "string" || !Number.isFinite(Date.parse(candidate.exportedAt))) return false;
	return collectionFields.every((field) => Array.isArray(candidate[field]) && candidate[field].every((item) => item !== null && typeof item === "object" && !Array.isArray(item)));
}
function SettingsPage() {
	const user = useApp((s) => s.user);
	const office = useApp((s) => s.office);
	const clients = useApp((s) => s.clients);
	const cases = useApp((s) => s.cases);
	const resetDemo = useApp((s) => s.resetDemo);
	const updateOffice = useApp((s) => s.updateOffice);
	const restoreBackup = useApp((s) => s.restoreBackup);
	const parties = useApp((s) => s.parties);
	const deadlines = useApp((s) => s.deadlines);
	const timeline = useApp((s) => s.timeline);
	const documents = useApp((s) => s.documents);
	const notes = useApp((s) => s.notes);
	const transactions = useApp((s) => s.transactions);
	const petitions = useApp((s) => s.petitions);
	const hearings = useApp((s) => s.hearings);
	const members = useApp((s) => s.members);
	const notices = useApp((s) => s.notices);
	const chat = useApp((s) => s.chat);
	const backupInput = (0, import_react.useRef)(null);
	const [name, setName] = (0, import_react.useState)(office?.name ?? "");
	const [lawyerName, setLawyerName] = (0, import_react.useState)(office?.lawyerName ?? "");
	const [address, setAddress] = (0, import_react.useState)(office?.address ?? "");
	const [phone, setPhone] = (0, import_react.useState)(office?.phone ?? "");
	const [barNumber, setBarNumber] = (0, import_react.useState)(office?.barNumber ?? "");
	const [lastBackupAt, setLastBackupAt] = (0, import_react.useState)(() => {
		try {
			return localStorage.getItem("lex-nova-last-backup-at") ?? "";
		} catch {
			return "";
		}
	});
	const downloadBackup = () => {
		const backup = {
			version: 1,
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			office,
			clients,
			cases,
			parties,
			deadlines,
			timeline,
			documents,
			notes,
			transactions,
			petitions,
			hearings,
			members,
			notices,
			chat
		};
		const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = `lex-nova-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
		anchor.click();
		window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
		const exportedAt = (/* @__PURE__ */ new Date()).toISOString();
		try {
			localStorage.setItem("lex-nova-last-backup-at", exportedAt);
		} catch {}
		setLastBackupAt(exportedAt);
		toast.success("نسخه پشتیبان دانلود شد.");
	};
	const importBackup = async (file) => {
		if (!file) return;
		try {
			const data = JSON.parse(await file.text());
			if (!isLexNovaBackup(data)) throw new Error("invalid backup");
			if (!window.confirm("بازیابی، اطلاعات فعلی این دستگاه را با اطلاعات فایل پشتیبان جایگزین می‌کند. پیش از ادامه، از اطلاعات فعلی خروجی بگیرید. ادامه می‌دهید؟")) return;
			restoreBackup(data);
			setName(data.office.name);
			setLawyerName(data.office.lawyerName);
			setAddress(data.office.address);
			setPhone(data.office.phone);
			setBarNumber(data.office.barNumber);
			toast.success("نسخه پشتیبان با موفقیت بازیابی شد.");
		} catch {
			toast.error("این فایل، پشتیبان معتبر Lex Nova نیست.");
		} finally {
			if (backupInput.current) backupInput.current.value = "";
		}
	};
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
					className: "lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-navy",
								children: "پشتیبان‌گیری و انتقال داده"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-2xl text-sm text-muted",
								children: "یک نسخه رمزنگاری‌نشده از داده‌های دفتر، شامل پرونده‌ها، موکلین، مالی و پیش‌نویس‌ها دریافت کنید و فقط در محل امن نگهدارید."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: downloadBackup,
										className: "inline-flex h-11 items-center gap-2 rounded-md bg-navy px-4 text-sm font-medium text-paper hover:bg-navy-deep",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "دریافت پشتیبان"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => backupInput.current?.click(),
										className: "inline-flex h-11 items-center gap-2 rounded-md border border-line bg-paper px-4 text-sm font-medium text-navy hover:border-navy/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDriveUpload, { className: "size-4" }), "بازیابی پشتیبان"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: backupInput,
										className: "hidden",
										type: "file",
										accept: "application/json,.json",
										onChange: (event) => void importBackup(event.target.files?.[0])
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-2 rounded-md bg-paper p-3 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorDown, { className: "size-4 shrink-0 text-brass" }), "همین فایل برای جابه‌جایی داده‌ها میان نسخه وب و نسخه دسکتاپ ویندوز قابل استفاده است."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted",
							children: ["آخرین خروجی پشتیبان: ", lastBackupAt ? new Intl.DateTimeFormat("fa-IR", {
								dateStyle: "medium",
								timeStyle: "short"
							}).format(new Date(lastBackupAt)) : "هنوز تهیه نشده"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Surface, {
					className: "lg:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-11 shrink-0 items-center justify-center rounded-md bg-paper text-brass",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-navy",
								children: "وضعیت ذخیره‌سازی"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "داده‌های دفتر در دیتابیس محلی IndexedDB این دستگاه نگهداری می‌شود؛ این روش برای پرونده‌های حقوقی، بدون انتقال اطلاعات هویتی به سرور، امن‌تر است."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted",
								children: "برای انتقال به دستگاه دیگر، از نسخهٔ پشتیبان همین صفحه استفاده کنید. همگام‌سازی ابری فقط پس از فعال‌سازی ورود امن و حساب‌های کاربری اضافه خواهد شد."
							})
						] })]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted",
			children: "داده‌های این نسخه روی همین دستگاه ذخیره می‌شود. پیامک واقعی، حساب بانکی و همگام‌سازی ابری در نسخه سازمانی فعال می‌شود."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => {
				if (window.confirm("همهٔ تغییرات محلی پاک و اطلاعات نمایشی اولیه جایگزین شود؟ اگر پشتیبان ندارید، این کار قابل بازگشت نیست.")) {
					resetDemo();
					toast.success("داده‌های نمایشی بازنشانی شد.");
				}
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
