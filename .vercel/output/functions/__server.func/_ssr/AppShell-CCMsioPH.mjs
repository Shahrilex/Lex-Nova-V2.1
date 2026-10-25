import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, m as useRouterState, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C78POfLB.mjs";
import { A as Briefcase, D as ChartColumn, M as BookOpen, N as Bell, O as CalendarDays, c as ShieldAlert, d as Scale, g as LayoutDashboard, h as Menu, i as Users, k as Building2, l as Settings, m as MessageSquareText, n as Wrench, r as Wallet, t as X, u as Search, v as Globe, y as FileText } from "../_libs/lucide-react.mjs";
import { a as planLabel, c as useApp } from "./store-BqT8Nr3J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-CCMsioPH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var groups = [
	{
		label: "کارتابل",
		items: [
			{
				to: "/dashboard",
				label: "داشبورد",
				icon: LayoutDashboard
			},
			{
				to: "/assistant",
				label: "دستیار هوشمند",
				icon: MessageSquareText
			},
			{
				to: "/clients",
				label: "موکلین",
				icon: Users
			},
			{
				to: "/cases",
				label: "پرونده‌ها",
				icon: Briefcase
			}
		]
	},
	{
		label: "اجرا",
		items: [
			{
				to: "/deadlines",
				label: "مواعد",
				icon: CalendarDays
			},
			{
				to: "/calendar",
				label: "تقویم",
				icon: CalendarDays
			},
			{
				to: "/editor",
				label: "ویرایشگر لایحه",
				icon: FileText
			}
		]
	},
	{
		label: "دفتر",
		items: [
			{
				to: "/finance",
				label: "مالی",
				icon: Wallet
			},
			{
				to: "/reports",
				label: "گزارش‌ها",
				icon: ChartColumn
			},
			{
				to: "/tools",
				label: "ابزارها",
				icon: Wrench
			},
			{
				to: "/library",
				label: "منابع حقوقی",
				icon: BookOpen
			},
			{
				to: "/conflict",
				label: "تعارض منافع",
				icon: ShieldAlert
			},
			{
				to: "/team",
				label: "تیم",
				icon: Building2
			},
			{
				to: "/portal",
				label: "پورتال موکل",
				icon: Globe
			},
			{
				to: "/settings",
				label: "تنظیمات",
				icon: Settings
			}
		]
	}
];
function AppShell({ children }) {
	const user = useApp((s) => s.user);
	const office = useApp((s) => s.office);
	const hydrated = useApp((s) => s.hydrated);
	const setHydrated = useApp((s) => s.setHydrated);
	const logout = useApp((s) => s.logout);
	const notices = useApp((s) => s.notices);
	const markNotice = useApp((s) => s.markNotice);
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [bell, setBell] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const clients = useApp((s) => s.clients);
	const cases = useApp((s) => s.cases);
	(0, import_react.useEffect)(() => {
		if (useApp.persist.hasHydrated()) setHydrated();
		const t = setTimeout(() => setHydrated(), 80);
		return () => clearTimeout(t);
	}, [setHydrated]);
	(0, import_react.useEffect)(() => {
		if (hydrated && !user) navigate({ to: "/" });
	}, [
		hydrated,
		user,
		navigate
	]);
	const unread = notices.filter((n) => !n.read).length;
	const hits = (0, import_react.useMemo)(() => {
		const query = q.trim();
		if (query.length < 2) return [];
		const clientHits = clients.filter((c) => c.fullName.includes(query) || c.nationalCode.includes(query) || c.mobile.includes(query)).slice(0, 4).map((c) => ({
			id: c.id,
			label: c.fullName,
			kind: "موکل",
			route: "client"
		}));
		const caseHits = cases.filter((c) => c.title.includes(query) || c.caseNumber.includes(query)).slice(0, 4).map((c) => ({
			id: c.id,
			label: c.title,
			kind: "پرونده",
			route: "case"
		}));
		return [...clientHits, ...caseHits];
	}, [
		q,
		clients,
		cases
	]);
	if (!hydrated || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-paper text-muted",
		children: "در حال بارگذاری دفتر..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cn("fixed inset-y-0 right-0 z-40 flex w-64 flex-col bg-navy text-paper transition-transform duration-200", open ? "translate-x-0" : "translate-x-full md:translate-x-0"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-b border-paper/10 px-5 py-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-10 items-center justify-center rounded-md bg-brass-soft/15 text-brass-soft",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold tracking-tight",
								children: "Jurist Assistant"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-paper/55",
								children: "دستیار حقوقدان"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "mr-auto rounded-md p-2 text-paper/70 md:hidden",
								onClick: () => setOpen(false),
								"aria-label": "بستن منو",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 space-y-4 overflow-y-auto p-3",
						children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 px-3 text-[11px] uppercase tracking-wider text-paper/40",
							children: g.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1",
							children: g.items.map((item) => {
								const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
								const Icon = item.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									onClick: () => setOpen(false),
									className: cn("flex min-h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors", active ? "bg-brass-soft font-medium text-navy" : "text-paper/80 hover:bg-paper/10"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
								}, item.to);
							})
						})] }, g.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-paper/10 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: office.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-paper/55",
								children: [
									user.role,
									" · پلن ",
									planLabel[user.plan]
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									logout();
									navigate({ to: "/" });
								},
								className: "mt-3 text-xs text-paper/50 hover:text-paper",
								children: "خروج"
							})
						]
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "fixed inset-0 z-30 bg-navy/40 md:hidden",
				onClick: () => setOpen(false),
				"aria-label": "بستن"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:mr-64",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-20 border-b border-line bg-surface/90 backdrop-blur",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded-md p-2 text-navy md:hidden",
								onClick: () => setOpen(true),
								"aria-label": "منو",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: q,
										onChange: (e) => setQ(e.target.value),
										placeholder: "جستجو در موکل، کد ملی و پرونده...",
										className: "h-11 w-full rounded-md border border-line bg-paper pr-10 pl-3 text-sm outline-none transition-colors focus:border-navy"
									}),
									hits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute mt-1 w-full overflow-hidden rounded-lg border border-line bg-surface shadow-lg",
										children: hits.map((h) => h.route === "client" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/clients/$id",
											params: { id: h.id },
											onClick: () => setQ(""),
											className: "flex items-center justify-between px-3 py-2.5 text-sm hover:bg-paper",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: h.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted",
												children: h.kind
											})]
										}, `c-${h.id}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/cases/$id",
											params: { id: h.id },
											onClick: () => setQ(""),
											className: "flex items-center justify-between px-3 py-2.5 text-sm hover:bg-paper",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: h.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted",
												children: h.kind
											})]
										}, `p-${h.id}`))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "relative flex size-11 items-center justify-center rounded-md border border-line text-navy",
									onClick: () => setBell((v) => !v),
									"aria-label": "اعلان‌ها",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 left-1.5 size-2 rounded-full bg-danger" })]
								}), bell && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute left-0 mt-2 w-72 overflow-hidden rounded-lg border border-line bg-surface shadow-lg",
									children: [notices.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "p-3 text-sm text-muted",
										children: "اعلانی نیست."
									}), notices.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "block w-full border-b border-line p-3 text-right last:border-0 hover:bg-paper",
										onClick: () => {
											markNotice(n.id);
											setBell(false);
											if (n.href) {
												if (n.href === "/deadlines") navigate({ to: "/deadlines" });
												else if (n.href === "/conflict") navigate({ to: "/conflict" });
												else if (n.href === "/calendar") navigate({ to: "/calendar" });
												else if (n.href === "/assistant") navigate({ to: "/assistant" });
											}
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: cn("text-sm", n.read ? "text-muted" : "font-medium text-navy"),
											children: n.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted",
											children: n.body
										})]
									}, n.id))]
								})]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto max-w-6xl p-4 md:p-6",
					children
				})]
			})
		]
	});
}
//#endregion
export { AppShell as t };
