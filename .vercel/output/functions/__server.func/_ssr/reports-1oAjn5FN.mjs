import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as money, c as toFaDigits } from "./utils-C78POfLB.mjs";
import { c as useApp, s as txLabel, t as caseTypeLabel } from "./store-BqT8Nr3J.mjs";
import { t as AppShell } from "./AppShell-CCMsioPH.mjs";
import { n as Surface, t as PageHeader } from "./PageHeader-COnGV0eU.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-1oAjn5FN.js
var import_jsx_runtime = require_jsx_runtime();
function ReportsPage() {
	const cases = useApp((s) => s.cases);
	const txs = useApp((s) => s.transactions);
	const deadlines = useApp((s) => s.deadlines);
	const byType = Object.entries(caseTypeLabel).map(([k, label]) => ({
		name: label,
		n: cases.filter((c) => c.caseType === k).length
	}));
	const byTx = Object.entries(txLabel).map(([k, label]) => ({
		name: label,
		n: txs.filter((t) => t.type === k).reduce((a, t) => a + t.amount, 0) / 1e6
	}));
	const income = txs.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
	const stamp = txs.filter((t) => t.type === "stamp").reduce((a, t) => a + t.amount, 0);
	const openDl = deadlines.filter((d) => !d.isCompleted).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "گزارش‌ها",
			subtitle: "وضعیت دفتر به تفکیک نوع پرونده و جریان مالی"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "درآمد ثبت‌شده",
					value: money(income)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "تمبر ابطالی",
					value: money(stamp)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "موعد باز",
					value: toFaDigits(openDl)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-semibold text-navy",
				children: "پرونده‌ها بر اساس نوع"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: byType,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "#ddd6c8",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "name",
								tick: {
									fontSize: 11,
									fill: "#6b6458"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								allowDecimals: false,
								tick: {
									fontSize: 11,
									fill: "#6b6458"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "n",
								fill: "#0c1e33",
								radius: [
									4,
									4,
									0,
									0
								]
							})
						]
					})
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-semibold text-navy",
				children: "جریان مالی (میلیون ریال)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: byTx,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "#ddd6c8",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "name",
								tick: {
									fontSize: 10,
									fill: "#6b6458"
								},
								interval: 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
								fontSize: 11,
								fill: "#6b6458"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "n",
								fill: "#8d7344",
								radius: [
									4,
									4,
									0,
									0
								]
							})
						]
					})
				})
			})] })]
		})
	] });
}
function Kpi({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xl font-semibold tabular-nums text-navy",
			children: value
		})]
	});
}
//#endregion
export { ReportsPage as component };
