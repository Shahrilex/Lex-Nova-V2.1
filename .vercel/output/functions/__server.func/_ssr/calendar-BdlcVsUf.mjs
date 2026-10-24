import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C78POfLB.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as useApp } from "./store-Cn8itLM_.mjs";
import { t as AppShell } from "./AppShell-BuPZlujY.mjs";
import { a as jKey, d as todayJ, f as weekDays, i as isWeekendOrHoliday, l as parseJalali, n as formatJ, o as jalaliMonths, r as holidayLabel, s as monthGrid, u as shiftMonth } from "./jalali-BQNfiI_Q.mjs";
import { n as Surface, t as PageHeader } from "./PageHeader-COnGV0eU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-BdlcVsUf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CalendarPage() {
	const now = todayJ();
	const [y, setY] = (0, import_react.useState)(now.y);
	const [m, setM] = (0, import_react.useState)(now.m);
	const [selected, setSelected] = (0, import_react.useState)(now);
	const deadlines = useApp((s) => s.deadlines);
	const hearings = useApp((s) => s.hearings);
	const cases = useApp((s) => s.cases);
	const addHearing = useApp((s) => s.addHearing);
	const updateHearing = useApp((s) => s.updateHearing);
	const [subject, setSubject] = (0, import_react.useState)("");
	const [caseId, setCaseId] = (0, import_react.useState)(cases[0]?.id ?? "");
	const [time, setTime] = (0, import_react.useState)("10:00");
	const cells = (0, import_react.useMemo)(() => monthGrid(y, m), [y, m]);
	const marks = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const d of deadlines) {
			const p = parseJalali(d.dueDate);
			if (!p) continue;
			const k = jKey(p);
			const cur = map.get(k) ?? {
				d: 0,
				h: 0
			};
			cur.d += 1;
			map.set(k, cur);
		}
		for (const h of hearings) {
			const p = parseJalali(h.date);
			if (!p) continue;
			const k = jKey(p);
			const cur = map.get(k) ?? {
				d: 0,
				h: 0
			};
			cur.h += 1;
			map.set(k, cur);
		}
		return map;
	}, [deadlines, hearings]);
	const dayDeadlines = deadlines.filter((d) => {
		const p = parseJalali(d.dueDate);
		return p && jKey(p) === jKey(selected);
	});
	const dayHearings = hearings.filter((h) => {
		const p = parseJalali(h.date);
		return p && jKey(p) === jKey(selected);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "تقویم جلالی",
		subtitle: "جلسات دادگاه و مواعد روی ماه شمسی"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-md border border-line px-3 text-sm",
					onClick: () => {
						const n = shiftMonth(y, m, -1);
						setY(n.y);
						setM(n.m);
					},
					children: "ماه قبل"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-semibold text-navy",
					children: [
						jalaliMonths[m - 1],
						" ",
						y
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-md border border-line px-3 text-sm",
					onClick: () => {
						const n = shiftMonth(y, m, 1);
						setY(n.y);
						setM(n.m);
					},
					children: "ماه بعد"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-7 gap-1 text-center text-xs text-muted",
			children: [weekDays.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-2",
				children: d
			}, d)), cells.map((c, i) => {
				if (!c) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}, i);
				const k = jKey(c);
				const mark = marks.get(k);
				const sel = jKey(selected) === k;
				const today = jKey(now) === k;
				const hol = isWeekendOrHoliday(c);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setSelected(c),
					className: cn("flex min-h-14 flex-col items-center rounded-md p-1 text-sm", hol && "text-danger", sel && "bg-navy text-paper", !sel && today && "border border-brass", !sel && !today && "hover:bg-paper"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.d }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-auto flex gap-0.5",
						children: [mark?.d ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: cn("size-1.5 rounded-full", sel ? "bg-brass-soft" : "bg-danger") }) : null, mark?.h ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: cn("size-1.5 rounded-full", sel ? "bg-paper" : "bg-brass") }) : null]
					})]
				}, k);
			})]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 font-semibold text-navy",
					children: formatJ(selected)
				}),
				holidayLabel(selected) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs text-danger",
					children: holidayLabel(selected)
				}),
				dayHearings.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 rounded-md border border-line p-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: h.subject
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								h.time,
								" · ",
								h.branch
							]
						}),
						h.result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: ["نتیجه: ", h.result]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							defaultValue: h.result,
							placeholder: "ثبت نتیجه جلسه",
							className: "mt-2 h-11 w-full rounded-md border border-line bg-paper px-3 text-xs",
							onBlur: (e) => {
								if (e.target.value !== h.result) updateHearing(h.id, { result: e.target.value });
							}
						})
					]
				}, h.id)),
				dayDeadlines.map((d) => {
					const cse = cases.find((c) => c.id === d.caseId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 rounded-md border border-line p-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: d.title
						}), cse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cases/$id",
							params: { id: cse.id },
							className: "text-xs text-brass",
							children: cse.title
						})]
					}, d.id);
				}),
				dayHearings.length === 0 && dayDeadlines.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "رویدادی در این روز نیست."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-3 text-sm font-semibold text-navy",
				children: "ثبت جلسه"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-2",
				onSubmit: (e) => {
					e.preventDefault();
					if (!subject.trim() || !caseId) return;
					const cse = cases.find((c) => c.id === caseId);
					addHearing({
						caseId,
						date: formatJ(selected),
						time,
						court: cse?.court ?? "",
						branch: cse?.branch ?? "",
						subject,
						result: ""
					});
					setSubject("");
					toast.success("جلسه ثبت شد.");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: caseId,
						onChange: (e) => setCaseId(e.target.value),
						className: "h-11 w-full rounded-md border border-line bg-paper px-3 text-sm",
						children: cases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.title
						}, c.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: subject,
						onChange: (e) => setSubject(e.target.value),
						placeholder: "موضوع جلسه",
						className: "h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						dir: "ltr",
						value: time,
						onChange: (e) => setTime(e.target.value),
						className: "h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "h-11 w-full rounded-md bg-navy text-sm text-paper",
						children: "ثبت روی این روز"
					})
				]
			})] })]
		})]
	})] });
}
//#endregion
export { CalendarPage as component };
