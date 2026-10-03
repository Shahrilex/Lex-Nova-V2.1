import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as todayJalali } from "./utils-C78POfLB.mjs";
import { r as Route$2 } from "./router-DmBs78x0.mjs";
import { c as useApp } from "./store-CsDxLcvY.mjs";
import { t as AppShell } from "./AppShell-DU1UGjuf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cases.new-DBD7jDZJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewCase() {
	const { clientId: preset } = Route$2.useSearch();
	const clients = useApp((s) => s.clients);
	const addCase = useApp((s) => s.addCase);
	const navigate = useNavigate();
	const [title, setTitle] = (0, import_react.useState)("");
	const [clientId, setClientId] = (0, import_react.useState)(preset ?? "");
	const [caseType, setCaseType] = (0, import_react.useState)("civil");
	const [court, setCourt] = (0, import_react.useState)("");
	const [branch, setBranch] = (0, import_react.useState)("");
	const [caseNumber, setCaseNumber] = (0, import_react.useState)("");
	const [claimAmount, setClaimAmount] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("active");
	const submit = (e) => {
		e.preventDefault();
		if (!title.trim() || !clientId) return;
		const id = addCase({
			title,
			clientId,
			caseType,
			court,
			branch,
			caseNumber,
			courtNumber: caseNumber,
			claimAmount,
			description,
			status,
			openedAt: todayJalali()
		});
		navigate({
			to: "/cases/$id",
			params: { id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/cases",
			className: "mb-3 inline-block text-sm text-muted hover:text-navy",
			children: "بازگشت"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-5 text-2xl font-semibold text-navy",
			children: "تشکیل پرونده جدید"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "max-w-xl space-y-4 rounded-lg border border-line bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["عنوان *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: title,
						onChange: (e) => setTitle(e.target.value),
						className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm outline-none focus:border-navy"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["موکل *", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						required: true,
						value: clientId,
						onChange: (e) => setClientId(e.target.value),
						className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "انتخاب کنید"
						}), clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.fullName
						}, c.id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["نوع", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: caseType,
							onChange: (e) => setCaseType(e.target.value),
							className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "civil",
									children: "حقوقی"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "criminal",
									children: "کیفری"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "family",
									children: "خانواده"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "commercial",
									children: "تجاری"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "administrative",
									children: "اداری"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["وضعیت", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: status,
							onChange: (e) => setStatus(e.target.value),
							className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "active",
									children: "فعال"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "draft",
									children: "پیش‌نویس"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "closed",
									children: "مختومه"
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["کلاسه", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: caseNumber,
						onChange: (e) => setCaseNumber(e.target.value),
						className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["مرجع قضایی", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: court,
						onChange: (e) => setCourt(e.target.value),
						className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["شعبه", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: branch,
						onChange: (e) => setBranch(e.target.value),
						className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["ارزش خواسته (ریال)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						dir: "ltr",
						value: claimAmount,
						onChange: (e) => setClaimAmount(e.target.value),
						className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["شرح", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: description,
						onChange: (e) => setDescription(e.target.value),
						className: "mt-1 min-h-24 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-11 rounded-md bg-navy px-5 text-sm font-medium text-paper",
						children: "ثبت پرونده"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cases",
						className: "inline-flex h-11 items-center rounded-md border border-line px-5 text-sm",
						children: "انصراف"
					})]
				})
			]
		})
	] });
}
//#endregion
export { NewCase as component };
