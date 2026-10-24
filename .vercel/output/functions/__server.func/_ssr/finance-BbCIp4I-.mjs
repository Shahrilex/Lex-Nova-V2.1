import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as toFaDigits, l as todayJalali, s as parseAmount } from "./utils-C78POfLB.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as useApp, s as txLabel } from "./store-Cn8itLM_.mjs";
import { t as AppShell } from "./AppShell-BuPZlujY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/finance-BbCIp4I-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FinancePage() {
	const txs = useApp((s) => s.transactions);
	const cases = useApp((s) => s.cases);
	const addTransaction = useApp((s) => s.addTransaction);
	const income = txs.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
	const trust = txs.filter((t) => t.type === "trust_in").reduce((a, t) => a + t.amount, 0) - txs.filter((t) => t.type === "trust_out").reduce((a, t) => a + t.amount, 0);
	const stamp = txs.filter((t) => t.type === "stamp").reduce((a, t) => a + t.amount, 0);
	const [caseId, setCaseId] = (0, import_react.useState)(cases[0]?.id ?? "");
	const [type, setType] = (0, import_react.useState)("income");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold text-navy",
				children: "امور مالی"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "حق‌الوکاله، وجوه امانی و تمبر ماده ۱۰۳"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					label: "حق‌الوکاله وصول‌شده",
					value: income
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					label: "مانده وجوه امانی",
					value: trust
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					label: "تمبر ماده ۱۰۳",
					value: stamp
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-6 grid gap-3 rounded-lg border border-line bg-surface p-4 sm:grid-cols-2 lg:grid-cols-5",
			onSubmit: (e) => {
				e.preventDefault();
				const n = parseAmount(amount);
				if (!n || !caseId) {
					toast.error("پرونده و مبلغ را کامل کنید.");
					return;
				}
				addTransaction({
					caseId,
					type,
					amount: n,
					description: description || txLabel[type],
					date: todayJalali(),
					isTrust: type === "trust_in" || type === "trust_out"
				});
				setAmount("");
				setDescription("");
				toast.success("تراکنش ثبت شد.");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: caseId,
					onChange: (e) => setCaseId(e.target.value),
					className: "h-11 rounded-md border border-line bg-paper px-3 text-sm",
					children: cases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.title
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: type,
					onChange: (e) => setType(e.target.value),
					className: "h-11 rounded-md border border-line bg-paper px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "income",
							children: "حق‌الوکاله"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "trust_in",
							children: "واریز امانی"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "trust_out",
							children: "برداشت امانی"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "stamp",
							children: "تمبر ۱۰۳"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "expense",
							children: "هزینه"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					dir: "ltr",
					value: amount,
					onChange: (e) => setAmount(e.target.value),
					placeholder: "مبلغ ریال",
					className: "h-11 rounded-md border border-line bg-paper px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: description,
					onChange: (e) => setDescription(e.target.value),
					placeholder: "شرح",
					className: "h-11 rounded-md border border-line bg-paper px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-md bg-navy text-sm font-medium text-paper",
					children: "ثبت تراکنش"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-lg border border-line bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[640px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "border-b border-line bg-paper text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "تاریخ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "پرونده"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "نوع"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "شرح"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "مبلغ"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: txs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: t.date
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: cases.find((c) => c.id === t.caseId)?.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: txLabel[t.type]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: t.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 tabular-nums",
							dir: "ltr",
							children: toFaDigits(t.amount.toLocaleString("en-US"))
						})
					]
				}, t.id)) })]
			})
		})
	] });
}
function Card({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-xl font-semibold tabular-nums text-navy",
			children: [toFaDigits(value.toLocaleString("en-US")), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mr-1 text-sm font-normal text-muted",
				children: "ریال"
			})]
		})]
	});
}
//#endregion
export { FinancePage as component };
