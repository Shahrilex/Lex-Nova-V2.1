import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as toFaDigits } from "./utils-C78POfLB.mjs";
import { n as sourceKindLabel, t as legalLibrary } from "./legal-library-Do-81LeP.mjs";
import { C as ClipboardList, F as ArrowUpLeft, M as BookOpen, T as ChevronLeft, u as Search, w as ChevronRight } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-CCMsioPH.mjs";
import { t as PageHeader } from "./PageHeader-COnGV0eU.mjs";
import { a as searchLegalMatters, i as legalMatterCategories, n as legalMatterActionTypes, r as legalMatterCatalog, t as LegalMatterPicker } from "./LegalMatterPicker-C3ZXlbMK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-B7nXoYFh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MATTER_PAGE_SIZE = 24;
function LibraryPage() {
	const [tab, setTab] = (0, import_react.useState)("sources");
	const [q, setQ] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("all");
	const [matterQuery, setMatterQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("");
	const [actionType, setActionType] = (0, import_react.useState)("");
	const [selectedMatterId, setSelectedMatterId] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const sources = (0, import_react.useMemo)(() => legalLibrary.filter((source) => {
		return (!q || source.title.includes(q) || source.article.includes(q) || source.summary.includes(q)) && (kind === "all" || source.kind === kind);
	}), [q, kind]);
	const matters = (0, import_react.useMemo)(() => searchLegalMatters(matterQuery, {
		category: category || void 0,
		actionType: actionType || void 0
	}).filter((matter) => !selectedMatterId || matter.id === selectedMatterId), [
		matterQuery,
		category,
		actionType,
		selectedMatterId
	]);
	const pageCount = Math.max(1, Math.ceil(matters.length / MATTER_PAGE_SIZE));
	const currentPage = Math.min(page, pageCount);
	const visibleMatters = matters.slice((currentPage - 1) * MATTER_PAGE_SIZE, currentPage * MATTER_PAGE_SIZE);
	const updateMatterFilter = (update) => {
		update();
		setPage(1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "کتابخانه حقوقی",
			subtitle: "منابع حقوقی دفتر و بانک عناوین خواسته‌ها و دعاوی قابل طرح"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "tablist",
			"aria-label": "بخش‌های کتابخانه حقوقی",
			className: "mb-5 flex flex-wrap gap-2 border-b border-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "tab",
				"aria-selected": tab === "sources",
				onClick: () => setTab("sources"),
				className: `inline-flex h-11 items-center gap-2 border-b-2 px-3 text-sm ${tab === "sources" ? "border-navy font-medium text-navy" : "border-transparent text-muted"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), " منابع حقوقی"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "tab",
				"aria-selected": tab === "matters",
				onClick: () => setTab("matters"),
				className: `inline-flex h-11 items-center gap-2 border-b-2 px-3 text-sm ${tab === "matters" ? "border-navy font-medium text-navy" : "border-transparent text-muted"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4" }),
					" عناوین خواسته‌ها و دعاوی",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-paper px-2 py-0.5 text-xs tabular-nums",
						children: toFaDigits(legalMatterCatalog.matters.length)
					})
				]
			})]
		}),
		tab === "sources" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			role: "tabpanel",
			"aria-label": "منابع حقوقی",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative min-w-48 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "جستجو در منابع"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: q,
							onChange: (event) => setQ(event.target.value),
							placeholder: "جستجو در عنوان، ماده یا متن",
							className: "h-11 w-full rounded-md border border-line bg-surface py-2 pe-10 ps-3 text-sm"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					"aria-label": "نوع منبع",
					value: kind,
					onChange: (event) => setKind(event.target.value),
					className: "h-11 rounded-md border border-line bg-surface px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "همه انواع"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "law",
							children: "قانون"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "procedure",
							children: "آیین دادرسی"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "unity",
							children: "وحدت رویه"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "opinion",
							children: "نظامات"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-line bg-surface p-4 sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-navy",
								children: source.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-paper px-2 py-0.5 text-xs text-muted",
								children: sourceKindLabel[source.kind]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-brass",
							children: source.article
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-7",
							children: source.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: source.citation
						})
					]
				}, source.id)), sources.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-lg border border-line bg-surface p-8 text-center text-sm text-muted",
					children: "منبعی با این مشخصات پیدا نشد."
				})]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			role: "tabpanel",
			"aria-label": "عناوین خواسته‌ها و دعاوی",
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-warn/30 bg-warn/5 p-4 text-sm leading-7 text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-ink",
							children: "کاتالوگ پایه؛ نه نظر حقوقی نهایی"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: legalMatterCatalog.disclaimer }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs",
							children: "صلاحیت مرجع، قابلیت اعتراض و مهلت‌ها را پیش از اقدام با متن تنقیح‌شدهٔ قانون و وضعیت پرونده تطبیق دهید."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(16rem,1fr)_minmax(12rem,0.5fr)_minmax(12rem,0.5fr)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "matter-catalog-search",
							className: "block text-sm font-medium sm:col-span-2 lg:col-span-1",
							children: ["عنوان، خواسته یا موضوع شکایت/پرونده", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalMatterPicker, {
								id: "matter-catalog-search",
								value: matterQuery,
								onChange: (value) => updateMatterFilter(() => {
									setMatterQuery(value);
									setSelectedMatterId("");
								}),
								onSelect: (matter) => updateMatterFilter(() => {
									setMatterQuery(matter.title);
									setCategory(matter.category);
									setActionType(matter.action_type);
									setSelectedMatterId(matter.id);
								}),
								className: "mt-1"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "گروه حقوقی"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: category,
							onChange: (event) => updateMatterFilter(() => {
								setCategory(event.target.value);
								setSelectedMatterId("");
							}),
							className: "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "همه گروه‌ها"
							}), legalMatterCategories.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: item
							}, item))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "نوع اقدام"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: actionType,
							onChange: (event) => updateMatterFilter(() => {
								setActionType(event.target.value);
								setSelectedMatterId("");
							}),
							className: "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "همه انواع اقدام"
							}), legalMatterActionTypes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: item
							}, item))]
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2 text-sm text-muted",
					"aria-live": "polite",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						toFaDigits(matters.length),
						" عنوان · صفحهٔ ",
						toFaDigits(currentPage),
						" از ",
						toFaDigits(pageCount)
					] }), (matterQuery || category || actionType) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setMatterQuery("");
							setCategory("");
							setActionType("");
							setSelectedMatterId("");
							setPage(1);
						},
						className: "h-10 rounded-md border border-line px-3 text-navy",
						children: "پاک‌کردن فیلترها"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [visibleMatters.map((matter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-lg border border-line bg-surface p-4 sm:p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-semibold text-navy",
											children: matter.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-paper px-2 py-0.5 text-xs text-muted",
											children: matter.action_type
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted",
										children: [
											matter.category,
											" · ",
											matter.subcategory
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted",
										children: [
											"شناسهٔ کاتالوگ: ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												dir: "ltr",
												className: "tabular-nums",
												children: matter.id
											}),
											" · ",
											matter.nature
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cases/new",
								search: { title: matter.title },
								className: "inline-flex h-11 shrink-0 items-center gap-2 rounded-md border border-line px-3 text-sm text-navy hover:border-navy/30",
								children: ["ایجاد پرونده با این عنوان ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpLeft, { className: "size-4" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "mt-3 border-t border-line pt-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
									className: "min-h-11 cursor-pointer py-2 text-sm font-medium text-navy",
									children: "مشاهدهٔ اطلاعات اولیهٔ مرجع، مستند و مهلت"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-2 grid gap-x-5 gap-y-3 text-sm sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatterField, {
											label: "مرجع صالح (پیشنهادی)",
											value: matter.competent_forum
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatterField, {
											label: "مبنای قانونی اولیه",
											value: matter.legal_basis
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatterField, {
											label: "قابلیت اعتراض",
											value: matter.appealability
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatterField, {
											label: "مهلت",
											value: matter.deadline
										})
									]
								}),
								matter.aliases.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-xs text-muted",
									children: ["نام‌های جایگزین: ", matter.aliases.join("، ")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 rounded-md bg-paper p-3 text-xs leading-6 text-muted",
									children: [
										"وضعیت: ",
										matter.verification_status,
										" · آخرین بازبینی داده: ",
										matter.last_reviewed,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										matter.notes
									]
								})
							]
						})]
					}, matter.id)), visibleMatters.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-lg border border-line bg-surface p-8 text-center text-sm text-muted",
						children: "عنوانی با این جستجو یا فیلترها پیدا نشد."
					})]
				}),
				pageCount > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "صفحه‌بندی عناوین دعاوی",
					className: "flex items-center justify-center gap-2 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: currentPage <= 1,
							onClick: () => setPage((value) => Math.max(1, value - 1)),
							className: "inline-flex h-11 items-center gap-1 rounded-md border border-line px-3 text-sm disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" }), " قبلی"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "px-2 text-sm text-muted tabular-nums",
							children: [
								toFaDigits(currentPage),
								" / ",
								toFaDigits(pageCount)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: currentPage >= pageCount,
							onClick: () => setPage((value) => Math.min(pageCount, value + 1)),
							className: "inline-flex h-11 items-center gap-1 rounded-md border border-line px-3 text-sm disabled:opacity-50",
							children: ["بعدی ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })]
						})
					]
				})
			]
		})
	] });
}
function MatterField({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 leading-7",
		children: value
	})] });
}
//#endregion
export { LibraryPage as component };
