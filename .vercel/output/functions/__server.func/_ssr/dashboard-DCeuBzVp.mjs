import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as money, c as toFaDigits } from "./utils-C78POfLB.mjs";
import { m as MessageSquareText } from "../_libs/lucide-react.mjs";
import { c as useApp } from "./store-Cn8itLM_.mjs";
import { t as AppShell } from "./AppShell-BuPZlujY.mjs";
import { d as todayJ, n as formatJ } from "./jalali-BQNfiI_Q.mjs";
import { n as Surface, t as PageHeader } from "./PageHeader-COnGV0eU.mjs";
import { n as StatusBadge } from "./Badges-BvDLyVDj.mjs";
import { t as findConflicts } from "./conflict-CUnjNDYQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DCeuBzVp.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const cases = useApp((s) => s.cases);
	const clients = useApp((s) => s.clients);
	const deadlines = useApp((s) => s.deadlines);
	const hearings = useApp((s) => s.hearings);
	const parties = useApp((s) => s.parties);
	const txs = useApp((s) => s.transactions);
	const active = cases.filter((c) => c.status === "active").length;
	const urgent = deadlines.filter((d) => d.isUrgent && !d.isCompleted).length;
	const income = txs.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
	const trust = txs.filter((t) => t.type === "trust_in").reduce((a, t) => a + t.amount, 0) - txs.filter((t) => t.type === "trust_out").reduce((a, t) => a + t.amount, 0);
	const conflicts = findConflicts(clients, parties, cases);
	const today = formatJ(todayJ());
	const upcomingHearings = hearings.filter((h) => !h.result).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "داشبورد",
			subtitle: `نمای کلی دفتر · امروز ${today}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/assistant",
			className: "mb-5 flex flex-col gap-3 rounded-xl bg-navy p-5 text-paper transition-transform duration-150 ease-out hover:bg-navy-deep sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-md bg-brass-soft/15 text-brass-soft",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareText, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-brass-soft",
					children: "دستیار هوشمند دفتر"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-medium",
					children: "موعد، تعارض منافع و پیش‌نویس لایحه را با استناد به مواد بپرسید"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex h-11 items-center justify-center rounded-md bg-brass-soft px-4 text-sm font-medium text-navy",
				children: "شروع گفتگو"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/assistant",
					search: {
						q: "موعد تجدیدنظرخواهی پرونده مطالبه وجه چک را محاسبه و گام بعدی را بگو.",
						caseId: "p1"
					},
					className: "inline-flex h-11 items-center rounded-md border border-line bg-surface px-3 text-sm hover:border-navy/30",
					children: "موعد تجدیدنظر چک"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/assistant",
					search: {
						q: "برای اعتراض به نظریه کارشناسی خلع ید چه لایحه‌ای بنویسم؟",
						caseId: "p2"
					},
					className: "inline-flex h-11 items-center rounded-md border border-line bg-surface px-3 text-sm hover:border-navy/30",
					children: "لایحه اعتراض کارشناسی"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/assistant",
					search: { q: "تعارض منافع حسین رضایی را با پرونده‌های دفتر تحلیل کن." },
					className: "inline-flex h-11 items-center rounded-md border border-line bg-surface px-3 text-sm hover:border-navy/30",
					children: "تحلیل تعارض منافع"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "پرونده فعال",
					value: toFaDigits(active),
					to: "/cases"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "موعد فوری",
					value: toFaDigits(urgent),
					to: "/deadlines",
					warn: urgent > 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "موکلین",
					value: toFaDigits(clients.length),
					to: "/clients"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "حق‌الوکاله",
					value: money(income),
					to: "/finance"
				})
			]
		}),
		conflicts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/conflict",
			className: "mb-5 flex items-start justify-between gap-3 rounded-xl border border-danger/30 bg-danger/5 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium text-danger",
				children: "هشدار تعارض منافع"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [toFaDigits(conflicts.length), " مورد شناسایی شد. پیش از پذیرش پرونده جدید بررسی کنید."]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-brass",
				children: "مشاهده"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-navy",
						children: "آخرین پرونده‌ها"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cases",
						className: "text-sm text-brass hover:underline",
						children: "همه"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: cases.slice(0, 5).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/cases/$id",
						params: { id: c.id },
						className: "flex items-center justify-between rounded-md border border-line px-3 py-3 hover:bg-paper",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: c.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: c.caseNumber
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })]
					}, c.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-navy",
						children: "مواعد نزدیک"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/deadlines",
						className: "text-sm text-brass hover:underline",
						children: "همه"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: deadlines.filter((d) => !d.isCompleted).slice(0, 5).map((d) => {
						const c = cases.find((x) => x.id === d.caseId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-line px-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: d.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: d.isUrgent ? "text-sm text-danger" : "text-sm text-muted",
										children: d.dueDate
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: c?.title
								}),
								d.legalArticle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: d.legalArticle
								})
							]
						}, d.id);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-navy",
						children: "جلسات دادگاه"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/calendar",
						className: "text-sm text-brass hover:underline",
						children: "تقویم"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [upcomingHearings.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-line px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: h.subject
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								h.date,
								" · ",
								h.time,
								" · ",
								h.branch
							]
						})]
					}, h.id)), upcomingHearings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "جلسه‌ای در راه نیست."
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 font-semibold text-navy",
						children: "وجوه امانی"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-semibold tabular-nums text-navy",
						children: money(trust)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "وجوه موکل جدا از حساب دفتر نگهداری می‌شود. برداشت فقط با دستور موکل."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/finance",
						className: "mt-3 inline-block text-sm text-brass hover:underline",
						children: "دفتر مالی"
					})
				] })
			]
		})
	] });
}
function Stat({ label, value, to, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "rounded-xl border border-line bg-surface p-4 transition-colors hover:border-navy/30",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 text-2xl font-semibold tabular-nums ${warn ? "text-danger" : "text-navy"}`,
			children: value
		})]
	});
}
//#endregion
export { Dashboard as component };
