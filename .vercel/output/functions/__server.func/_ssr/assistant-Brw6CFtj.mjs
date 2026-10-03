import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { o as nowTime, t as cn, u as uid } from "./utils-C78POfLB.mjs";
import { C as ArrowUp, d as MessageSquareText, g as Copy, o as Trash2, u as Scale } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Route$19 } from "./router-DmBs78x0.mjs";
import { c as useApp, i as partyRoleLabel, o as statusLabel, t as caseTypeLabel } from "./store-CsDxLcvY.mjs";
import { t as AppShell } from "./AppShell-DU1UGjuf.mjs";
import { n as createSsrRpc, t as copyText } from "./print-3TRRD6gQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant-Brw6CFtj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var askCounsel = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("ef53e6188f67bbae2eeca620676d13792f19f46855bfc6121e5e7494985c7cf5"));
function buildOfficeBrief(input) {
	const lines = [];
	const selected = input.cases.find((c) => c.id === input.selectedCaseId);
	if (selected) {
		const client = input.clients.find((c) => c.id === selected.clientId);
		lines.push(`پرونده منتخب: ${selected.title} | کلاسه ${selected.caseNumber || "—"} | ${selected.court || "بدون مرجع"} ${selected.branch} | ${statusLabel[selected.status] ?? selected.status} | ${caseTypeLabel[selected.caseType] ?? ""}`);
		lines.push(`موکل: ${client?.fullName ?? "نامشخص"}`);
		if (selected.description) lines.push(`شرح: ${selected.description}`);
		if (selected.claimAmount && selected.claimAmount !== "0") lines.push(`خواسته: ${selected.claimAmount} ریال`);
		const parties = input.parties.filter((p) => p.caseId === selected.id);
		if (parties.length) lines.push("طرفین: " + parties.map((p) => `${p.fullName} (${partyRoleLabel[p.role] ?? p.role})`).join("؛ "));
		const notes = input.notes.filter((n) => n.caseId === selected.id).slice(0, 2);
		for (const n of notes) lines.push(`یادداشت داخلی: ${n.body}`);
	}
	const urgent = input.deadlines.filter((d) => !d.isCompleted).slice(0, 6);
	if (urgent.length) {
		lines.push("مواعد باز دفتر:");
		for (const d of urgent) {
			const cse = input.cases.find((c) => c.id === d.caseId);
			lines.push(`- ${d.title} | ${cse?.title ?? d.caseId} | سررسید ${d.dueDate}${d.isUrgent ? " | فوری" : ""}${d.legalArticle ? ` | ${d.legalArticle}` : ""}`);
		}
	}
	const hearings = input.hearings.filter((h) => !h.result).slice(0, 3);
	if (hearings.length) {
		lines.push("جلسات پیش‌رو:");
		for (const h of hearings) {
			const cse = input.cases.find((c) => c.id === h.caseId);
			lines.push(`- ${h.date} ${h.time} | ${h.subject} | ${cse?.title ?? ""} | ${h.branch}`);
		}
	}
	return lines.join("\n").slice(0, 2800);
}
function AssistantPage() {
	const search = Route$19.useSearch();
	const cases = useApp((s) => s.cases);
	const clients = useApp((s) => s.clients);
	const deadlines = useApp((s) => s.deadlines);
	const parties = useApp((s) => s.parties);
	const notes = useApp((s) => s.notes);
	const hearings = useApp((s) => s.hearings);
	const chat = useApp((s) => s.chat) ?? [];
	const pushChat = useApp((s) => s.pushChat);
	const clearChat = useApp((s) => s.clearChat);
	const savePetition = useApp((s) => s.savePetition);
	const [caseId, setCaseId] = (0, import_react.useState)(search.caseId ?? "");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)("");
	const scroller = (0, import_react.useRef)(null);
	const primed = (0, import_react.useRef)(false);
	const caseItem = cases.find((c) => c.id === caseId);
	const officeBrief = (0, import_react.useMemo)(() => buildOfficeBrief({
		cases,
		clients,
		deadlines,
		parties,
		notes,
		hearings,
		selectedCaseId: caseId || void 0
	}), [
		cases,
		clients,
		deadlines,
		parties,
		notes,
		hearings,
		caseId
	]);
	const suggestions = (0, import_react.useMemo)(() => {
		const items = deadlines.filter((d) => d.isUrgent && !d.isCompleted).slice(0, 2).map((d) => {
			const cse = cases.find((c) => c.id === d.caseId);
			return {
				q: `موعد «${d.title}» پرونده «${cse?.title ?? ""}» را بررسی کن و گام بعدی را بگو.`,
				caseId: d.caseId
			};
		});
		items.push({
			q: "تعارض منافع احتمالی دفتر را بر اساس طرفین پرونده‌ها تحلیل کن.",
			caseId: "p2"
		});
		items.push({
			q: "خسارت تأخیر تأدیه چک طبق رأی وحدت رویه ۷۳۳ چگونه مطالبه می‌شود؟",
			caseId: "p1"
		});
		return items.slice(0, 4);
	}, [deadlines, cases]);
	(0, import_react.useEffect)(() => {
		scroller.current?.scrollTo({
			top: scroller.current.scrollHeight,
			behavior: "smooth"
		});
	}, [chat, busy]);
	const send = async (text, nextCase = caseId) => {
		const query = text.trim();
		if (!query || busy) return;
		setDraft("");
		setError("");
		setSaved("");
		if (nextCase !== caseId) setCaseId(nextCase);
		pushChat({
			id: uid(),
			role: "user",
			content: query,
			at: nowTime(),
			caseId: nextCase || void 0
		});
		setBusy(true);
		const brief = buildOfficeBrief({
			cases,
			clients,
			deadlines,
			parties,
			notes,
			hearings,
			selectedCaseId: nextCase || void 0
		});
		const history = [...chat, {
			role: "user",
			content: query
		}].map((m) => ({
			role: m.role,
			content: m.content
		}));
		try {
			const res = await askCounsel({ data: {
				query,
				officeBrief: brief,
				messages: history
			} });
			if (res.ok) pushChat({
				id: uid(),
				role: "assistant",
				content: res.text,
				at: nowTime(),
				caseId: nextCase || void 0,
				citations: res.citations,
				source: res.source
			});
			else setError(res.error);
		} catch {
			setError("ارتباط با دستیار برقرار نشد. دوباره تلاش کنید.");
		} finally {
			setBusy(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (primed.current) return;
		if (search.q) {
			primed.current = true;
			send(search.q, search.caseId ?? caseId);
		}
	}, [search.q]);
	const lastAssistant = [...chat].reverse().find((t) => t.role === "assistant");
	const canSaveDraft = !!lastAssistant && lastAssistant.content.length > 180 && /ریاست محترم|خواهان:/.test(lastAssistant.content);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex flex-wrap items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold tracking-tight text-navy",
			children: "دستیار هوشمند"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "پرسش حقوقی، محاسبه موعد و پیش‌نویس لایحه با استناد به مواد"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => clearChat(),
			className: "inline-flex h-11 items-center gap-2 rounded-md border border-line px-3 text-sm text-muted transition-transform duration-150 ease-out hover:text-navy active:scale-[0.96]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "پاک کردن گفتگو"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_17rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex min-h-[32rem] flex-col overflow-hidden rounded-xl border border-line bg-surface",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: scroller,
					className: "min-h-0 flex-1 space-y-3 overflow-y-auto p-4",
					children: [
						chat.length === 0 && !busy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-full min-h-72 flex-col items-center justify-center px-4 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-3 flex size-12 items-center justify-center rounded-lg bg-navy text-brass-soft",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-navy",
									children: "مشاور پرونده‌های همین دفتر"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-sm text-sm leading-7 text-muted",
									children: "موعد قانونی، تعارض منافع و پیش‌نویس اوراق را با پرونده منتخب بپرسید. پاسخ باید پیش از تقدیم بازبینی شود."
								})
							]
						}),
						chat.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: cn("counsel-msg max-w-[42rem]", t.role === "user" ? "mr-auto rounded-lg bg-navy px-4 py-3 text-paper" : "ml-auto"),
							children: [
								t.role === "assistant" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mb-1 flex items-center gap-1.5 text-xs text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareText, { className: "size-3.5" }), t.source === "model" ? "پاسخ مدل هوشمند" : "پاسخ بر اساس منابع دفتر"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("whitespace-pre-wrap text-sm leading-7", t.role === "user" ? "text-paper" : "text-ink"),
									children: t.content
								}),
								t.role === "assistant" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "mt-2 inline-flex h-11 items-center gap-1 text-xs text-muted hover:text-navy",
									onClick: async () => toast.success(await copyText(t.content) ? "پاسخ کپی شد." : "کپی انجام نشد."),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "کپی پاسخ"]
								}),
								t.citations && t.citations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 space-y-1.5",
									children: t.citations.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "rounded-md border border-line bg-paper px-3 py-2 text-xs leading-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-navy",
											children: c.article
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [" — ", c.title]
										})]
									}, c.id))
								})
							]
						}, t.id)),
						busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "counsel-thinking text-sm",
							"aria-live": "polite",
							children: "در حال بررسی منابع و مواعد دفتر..."
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: error
						}),
						saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-ok",
							children: saved
						})
					]
				}),
				canSaveDraft && caseId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-line px-4 py-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 text-sm text-brass hover:underline",
						onClick: () => {
							if (!lastAssistant) return;
							savePetition({
								caseId,
								title: "پیش‌نویس دستیار هوشمند",
								body: lastAssistant.content
							});
							setSaved("در پرونده ذخیره شد. از ویرایشگر لایحه باز کنید.");
							toast.success("لایحه در پرونده ذخیره شد.");
						},
						children: "ذخیره آخرین پاسخ به‌عنوان لایحه"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-line p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 flex flex-wrap gap-2",
						children: suggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy,
							onClick: () => void send(s.q, s.caseId),
							className: "h-11 max-w-full truncate rounded-md border border-line bg-paper px-3 text-right text-xs text-navy transition-colors hover:border-navy/30 disabled:opacity-50",
							children: s.q
						}, s.q))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							send(draft);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "sr-only",
								htmlFor: "counsel-input",
								children: "پرسش حقوقی"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "counsel-input",
								value: draft,
								onChange: (e) => setDraft(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										send(draft);
									}
								},
								rows: 2,
								placeholder: "مثلاً: مهلت اعتراض کارشناسی پرونده خلع ید تا کی است؟",
								className: "min-h-11 flex-1 resize-none rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-navy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: busy || !draft.trim(),
								className: "flex size-11 shrink-0 items-center justify-center rounded-md bg-navy text-paper transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-50",
								"aria-label": "ارسال",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
							})
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-medium text-navy",
					children: ["پرونده زمینه", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: caseId,
						onChange: (e) => setCaseId(e.target.value),
						className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "همه پرونده‌های دفتر"
						}), cases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.title
						}, c.id))]
					})]
				}), caseItem && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-1 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted",
							children: caseItem.caseNumber || "بدون کلاسه"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: caseItem.court || "مرجع هنوز ثبت نشده" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cases/$id",
							params: { id: caseItem.id },
							className: "inline-block pt-2 text-sm text-brass hover:underline",
							children: "گشودن پرونده"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-sm font-semibold text-navy",
					children: "خلاصه کارتابل"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1.5 text-xs leading-6 text-muted",
					children: officeBrief.split("\n").map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line }, `${i}-${line}`))
				})]
			})]
		})]
	})] });
}
//#endregion
export { AssistantPage as component };
