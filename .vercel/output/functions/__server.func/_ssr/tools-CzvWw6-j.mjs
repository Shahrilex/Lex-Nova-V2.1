import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as money, l as todayJalali, s as parseAmount } from "./utils-C78POfLB.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as useApp } from "./store-CsDxLcvY.mjs";
import { t as AppShell } from "./AppShell-DU1UGjuf.mjs";
import { n as Surface, t as PageHeader } from "./PageHeader-COnGV0eU.mjs";
import { n as deadlineRules, t as calculateDeadline } from "./deadline-engine-Cw4DJRaM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tools-CzvWw6-j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function stampTax(fee) {
	const rate = .05;
	return {
		rate,
		tax: Math.round(fee * rate),
		note: "تمبر مالیاتی وکالت موضوع ماده ۱۰۳ قانون مالیات‌های مستقیم؛ علی‌الحساب ۵٪ مبلغ حق‌الوکاله مندرج در وکالتنامه."
	};
}
function courtFee(claim) {
	if (claim <= 0) return {
		fee: 0,
		note: "دعوای غیرمالی یا بدون خواسته مشخص؛ هزینه دادرسی ثابت حسب تعرفه‌ی سال اعمال می‌شود."
	};
	const low = Math.min(claim, 2e8);
	const high = Math.max(claim - 2e8, 0);
	return {
		fee: Math.round(low * .025 + high * .015),
		note: "برآورد ساده هزینه دادرسی مرحله بدوی: ۲٫۵٪ تا دویست میلیون ریال و ۱٫۵٪ مازاد. تعرفه رسمی هر سال را کنترل کنید."
	};
}
function ToolsPage() {
	const addDeadline = useApp((s) => s.addDeadline);
	const cases = useApp((s) => s.cases);
	const [ruleCode, setRuleCode] = (0, import_react.useState)("REV-20");
	const [notice, setNotice] = (0, import_react.useState)(todayJalali());
	const [abroad, setAbroad] = (0, import_react.useState)(false);
	const [caseId, setCaseId] = (0, import_react.useState)(cases[0]?.id ?? "");
	const calc = calculateDeadline({
		ruleCode,
		noticeDate: notice,
		abroad
	});
	const [fee, setFee] = (0, import_react.useState)("80000000");
	const [claim, setClaim] = (0, import_react.useState)("250000000");
	const stamp = stampTax(parseAmount(fee));
	const court = courtFee(parseAmount(claim));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "ابزارها",
		subtitle: "محاسبه موعد قانونی و تمبر ماده ۱۰۳"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-4 font-semibold text-navy",
			children: "ماشین‌حساب موعد"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["قاعده", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: ruleCode,
						onChange: (e) => setRuleCode(e.target.value),
						className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm",
						children: deadlineRules.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: r.code,
							children: r.title
						}, r.code))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["تاریخ مبدأ (ابلاغ)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: notice,
						onChange: (e) => setNotice(e.target.value),
						className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: abroad,
						onChange: (e) => setAbroad(e.target.checked)
					}), "مقیم خارج از کشور (مهلت ۶۰ روز در موارد مشمول)"]
				}),
				calc.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md bg-paper p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-lg font-semibold text-navy",
						children: ["سررسید: ", calc.dueDate]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-2 list-decimal space-y-1 pr-5 text-xs text-muted",
						children: calc.log.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: l }, l))
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger",
					children: calc.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["پرونده برای ثبت موعد", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: caseId,
						onChange: (e) => setCaseId(e.target.value),
						className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm",
						children: cases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.title
						}, c.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-md bg-navy px-4 text-sm text-paper",
					disabled: !calc.ok,
					onClick: () => {
						if (!calc.ok || !calc.dueDate || !calc.rule) return;
						addDeadline({
							title: calc.rule.title,
							caseId,
							dueDate: calc.dueDate,
							type: "legal",
							isUrgent: (calc.days ?? 20) <= 10,
							legalArticle: calc.rule.article,
							ruleCode: calc.rule.code
						});
						toast.success("موعد روی پرونده ثبت شد.");
					},
					children: "ثبت موعد روی پرونده"
				})
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-semibold text-navy",
				children: "تمبر و هزینه دادرسی"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm font-medium",
				children: ["حق‌الوکاله (ریال)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					dir: "ltr",
					value: fee,
					onChange: (e) => setFee(e.target.value),
					className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xl font-semibold text-navy",
				children: money(stamp.tax)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: stamp.note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-5 block text-sm font-medium",
				children: ["خواسته دعوا (ریال)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					dir: "ltr",
					value: claim,
					onChange: (e) => setClaim(e.target.value),
					className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xl font-semibold text-navy",
				children: money(court.fee)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: court.note
			})
		] })]
	})] });
}
//#endregion
export { ToolsPage as component };
