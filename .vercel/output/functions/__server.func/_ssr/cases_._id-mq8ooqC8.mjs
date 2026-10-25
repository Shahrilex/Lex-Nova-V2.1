import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as money, l as todayJalali, s as parseAmount } from "./utils-C78POfLB.mjs";
import { r as retrieveSources } from "./retrieve-B0Qq00Bn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Route$3 } from "./router-BY0Peqd6.mjs";
import { t as useShallow } from "../_libs/zustand.mjs";
import { c as useApp, i as partyRoleLabel, o as statusLabel, s as txLabel, t as caseTypeLabel } from "./store-BqT8Nr3J.mjs";
import { t as AppShell } from "./AppShell-CCMsioPH.mjs";
import { r as printLegalDoc, t as copyText } from "./print-3TRRD6gQ.mjs";
import { n as getDesktopBridge, t as askDesktopAi } from "./desktop-bridge-DocYIleG.mjs";
import { n as StatusBadge, t as DeadlineBadge } from "./Badges-Mo9jjYg7.mjs";
import { t as Attachments } from "./Attachments-BfpPLMQy.mjs";
import { n as generateDraft, t as draftPetition } from "./generate-draft-Ba-LuUh2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cases_._id-mq8ooqC8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CaseDetail() {
	const { id } = Route$3.useParams();
	const caseItem = useApp((s) => s.cases.find((c) => c.id === id));
	const client = useApp((s) => s.clients.find((c) => c.id === caseItem?.clientId));
	const deadlines = useApp(useShallow((s) => s.deadlines.filter((d) => d.caseId === id)));
	const timeline = useApp(useShallow((s) => s.timeline.filter((t) => t.caseId === id)));
	const documents = useApp(useShallow((s) => s.documents.filter((d) => d.caseId === id)));
	const notes = useApp(useShallow((s) => s.notes.filter((n) => n.caseId === id)));
	const parties = useApp(useShallow((s) => s.parties.filter((p) => p.caseId === id)));
	const txs = useApp(useShallow((s) => s.transactions.filter((t) => t.caseId === id)));
	const hearings = useApp(useShallow((s) => s.hearings.filter((h) => h.caseId === id)));
	const petitions = useApp(useShallow((s) => s.petitions.filter((p) => p.caseId === id)));
	const office = useApp((s) => s.office);
	const addNote = useApp((s) => s.addNote);
	const addTimeline = useApp((s) => s.addTimeline);
	const addDocument = useApp((s) => s.addDocument);
	const deleteDocument = useApp((s) => s.deleteDocument);
	const updateDocument = useApp((s) => s.updateDocument);
	const addDeadline = useApp((s) => s.addDeadline);
	const toggleDeadline = useApp((s) => s.toggleDeadline);
	const addParty = useApp((s) => s.addParty);
	const addTransaction = useApp((s) => s.addTransaction);
	const savePetition = useApp((s) => s.savePetition);
	const updateCase = useApp((s) => s.updateCase);
	const deleteCase = useApp((s) => s.deleteCase);
	const updateCaseAttachments = useApp((s) => s.updateCaseAttachments);
	const navigate = useNavigate();
	const [editingCase, setEditingCase] = (0, import_react.useState)(false);
	const [editTitle, setEditTitle] = (0, import_react.useState)(caseItem?.title ?? "");
	const [editCourt, setEditCourt] = (0, import_react.useState)(caseItem?.court ?? "");
	const [editBranch, setEditBranch] = (0, import_react.useState)(caseItem?.branch ?? "");
	const [editDescription, setEditDescription] = (0, import_react.useState)(caseItem?.description ?? "");
	const updateHearing = useApp((s) => s.updateHearing);
	const [tab, setTab] = (0, import_react.useState)("summary");
	const [note, setNote] = (0, import_react.useState)("");
	const [action, setAction] = (0, import_react.useState)("");
	const [docTitle, setDocTitle] = (0, import_react.useState)("");
	const [dlTitle, setDlTitle] = (0, import_react.useState)("");
	const [dlDate, setDlDate] = (0, import_react.useState)("");
	const [pName, setPName] = (0, import_react.useState)("");
	const [pCode, setPCode] = (0, import_react.useState)("");
	const [pRole, setPRole] = (0, import_react.useState)("opponent");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [aiBusy, setAiBusy] = (0, import_react.useState)(false);
	const [aiHint, setAiHint] = (0, import_react.useState)("");
	const [txType, setTxType] = (0, import_react.useState)("income");
	const [txAmount, setTxAmount] = (0, import_react.useState)("");
	const [txDesc, setTxDesc] = (0, import_react.useState)("");
	const [hearingDrafts, setHearingDrafts] = (0, import_react.useState)({});
	if (!caseItem) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "پرونده یافت نشد."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/cases",
		className: "text-sm text-brass",
		children: "بازگشت"
	})] });
	const tabs = [
		{
			id: "summary",
			label: "خلاصه"
		},
		{
			id: "parties",
			label: "طرفین"
		},
		{
			id: "timeline",
			label: "تایم‌لاین"
		},
		{
			id: "docs",
			label: "اسناد"
		},
		{
			id: "deadlines",
			label: "مواعد"
		},
		{
			id: "finance",
			label: "مالی"
		},
		{
			id: "notes",
			label: "یادداشت"
		},
		{
			id: "ai",
			label: "هوش مصنوعی"
		}
	];
	const claim = Number(caseItem.claimAmount) || 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/cases",
			className: "mb-3 inline-block text-sm text-muted hover:text-navy",
			children: "بازگشت به پرونده‌ها"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-semibold text-navy",
						children: caseItem.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: caseItem.status }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: caseItem.status,
						onChange: (e) => {
							updateCase(id, { status: e.target.value });
							toast.success("وضعیت پرونده به‌روز شد.");
						},
						className: "h-11 rounded-md border border-line bg-surface px-3 text-sm",
						"aria-label": "وضعیت پرونده",
						children: Object.entries(statusLabel).map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: k,
							children: label
						}, k))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					caseItem.caseNumber || "بدون کلاسه",
					" · ",
					caseItem.court || "—",
					" ",
					caseItem.branch && `· ${caseItem.branch}`,
					" ·",
					" ",
					caseTypeLabel[caseItem.caseType]
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex h-11 items-center rounded-md border border-line px-4 text-sm",
						onClick: () => {
							const body = [
								`پرونده: ${caseItem.title}`,
								`کلاسه: ${caseItem.caseNumber || "—"}`,
								`موکل: ${client?.fullName ?? "—"}`,
								`مرجع: ${caseItem.court} ${caseItem.branch}`,
								`خواسته: ${claim ? money(claim) : "غیرمالی"}`,
								"",
								caseItem.description,
								"",
								"طرفین:",
								...parties.map((p) => `- ${p.fullName} (${partyRoleLabel[p.role]})`),
								"",
								"مواعد باز:",
								...deadlines.filter((d) => !d.isCompleted).map((d) => `- ${d.title} · ${d.dueDate}`)
							].join("\n");
							printLegalDoc({
								officeName: office?.name ?? "دفتر وکالت",
								lawyerName: office?.lawyerName ?? "",
								barNumber: office?.barNumber,
								heading: `خلاصه پرونده ${caseItem.title}`,
								meta: caseItem.caseNumber,
								body
							});
						},
						children: "چاپ خلاصه"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/assistant",
						search: {
							caseId: caseItem.id,
							q: `پرونده «${caseItem.title}» را خلاصه کن و ریسک مواعد را بگو.`
						},
						className: "inline-flex h-11 items-center rounded-md border border-line px-4 text-sm",
						children: "پرسش از دستیار"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/editor",
						search: { caseId: caseItem.id },
						className: "inline-flex h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-paper",
						children: "نوشتن لایحه"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setEditingCase((value) => !value),
				className: "h-10 rounded-md border border-line px-4 text-sm",
				children: editingCase ? "بستن ویرایش" : "ویرایش پرونده"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					if (window.confirm(`پرونده «${caseItem.title}» و اطلاعات وابسته حذف شود؟`)) {
						deleteCase(id);
						navigate({ to: "/cases" });
					}
				},
				className: "h-10 rounded-md border border-danger px-4 text-sm text-danger",
				children: "حذف پرونده"
			})]
		}),
		editingCase && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-5 grid gap-3 rounded-xl border border-line bg-surface p-4 sm:grid-cols-2",
			onSubmit: (event) => {
				event.preventDefault();
				updateCase(id, {
					title: editTitle.trim(),
					court: editCourt,
					branch: editBranch,
					description: editDescription
				});
				setEditingCase(false);
				toast.success("پرونده به‌روز شد.");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm",
					children: ["عنوان", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: editTitle,
						onChange: (event) => setEditTitle(event.target.value),
						className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm",
					children: ["مرجع قضایی", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: editCourt,
						onChange: (event) => setEditCourt(event.target.value),
						className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm",
					children: ["شعبه", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: editBranch,
						onChange: (event) => setEditBranch(event.target.value),
						className: "mt-1 h-11 w-full rounded-md border border-line bg-paper px-3"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm sm:col-span-2",
					children: ["شرح", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: editDescription,
						onChange: (event) => setEditDescription(event.target.value),
						className: "mt-1 min-h-24 w-full rounded-md border border-line bg-paper p-3"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-md bg-navy px-4 text-sm text-paper sm:col-span-2",
					children: "ذخیره تغییرات"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Attachments, {
				files: caseItem.attachments ?? [],
				onChange: (attachments) => updateCaseAttachments(id, attachments)
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-1 overflow-x-auto border-b border-line",
			children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setTab(t.id),
				className: `h-11 shrink-0 px-4 text-sm ${tab === t.id ? "border-b-2 border-navy font-medium text-navy" : "text-muted"}`,
				children: t.label
			}, t.id))
		}),
		tab === "summary" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						client ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/clients/$id",
							params: { id: client.id },
							className: "rounded-xl border border-line bg-surface p-4 hover:border-navy/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "موکل"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-medium",
								children: client.fullName
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "موکل",
							value: "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "تاریخ تشکیل",
							value: caseItem.openedAt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "خواسته",
							value: claim ? money(claim) : "غیرمالی / نامشخص"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "مواعد باز",
							value: String(deadlines.filter((d) => !d.isCompleted).length)
						})
					]
				}),
				caseItem.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl border border-line bg-surface p-4 text-sm leading-7",
					children: caseItem.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-sm font-semibold text-navy",
								children: "جلسات"
							}),
							hearings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "جلسه‌ای ثبت نشده."
							}),
							hearings.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mb-3 space-y-1 text-sm",
								onSubmit: (e) => {
									e.preventDefault();
									updateHearing(h.id, { result: hearingDrafts[h.id] ?? h.result });
									toast.success("نتیجه جلسه ثبت شد.");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									h.date,
									" · ",
									h.time,
									" — ",
									h.subject
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: hearingDrafts[h.id] ?? h.result,
										onChange: (e) => setHearingDrafts((s) => ({
											...s,
											[h.id]: e.target.value
										})),
										placeholder: "نتیجه جلسه",
										className: "h-11 flex-1 rounded-md border border-line bg-paper px-3 text-sm"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "h-11 rounded-md border border-line px-3 text-xs",
										children: "ثبت"
									})]
								})]
							}, h.id))
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 text-sm font-semibold text-navy",
							children: "طرفین"
						}), parties.slice(0, 4).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: [
								p.fullName,
								" · ",
								partyRoleLabel[p.role]
							]
						}, p.id))]
					})]
				})
			]
		}),
		tab === "parties" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-4 grid gap-2 sm:grid-cols-[1fr_8rem_10rem_auto]",
			onSubmit: (e) => {
				e.preventDefault();
				if (!pName.trim()) return;
				addParty({
					caseId: id,
					fullName: pName,
					nationalCode: pCode,
					role: pRole,
					notes: ""
				});
				setPName("");
				setPCode("");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: pName,
					onChange: (e) => setPName(e.target.value),
					placeholder: "نام",
					className: "h-11 rounded-md border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					dir: "ltr",
					value: pCode,
					onChange: (e) => setPCode(e.target.value),
					placeholder: "کد ملی",
					className: "h-11 rounded-md border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: pRole,
					onChange: (e) => setPRole(e.target.value),
					className: "h-11 rounded-md border border-line bg-surface px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "client_side",
							children: "طرف موکل"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "opponent",
							children: "طرف مقابل"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "third",
							children: "ثالث"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "opp_counsel",
							children: "وکیل مقابل"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-md bg-navy px-4 text-sm text-paper",
					children: "افزودن"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: parties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap justify-between gap-2 rounded-xl border border-line bg-surface px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: p.fullName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					dir: "ltr",
					children: p.nationalCode || "—"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: partyRoleLabel[p.role]
				})]
			}, p.id))
		})] }),
		tab === "timeline" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-2 sm:flex-row",
					onSubmit: (e) => {
						e.preventDefault();
						if (!action.trim()) return;
						addTimeline(id, action, "", "action");
						setAction("");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: action,
						onChange: (e) => setAction(e.target.value),
						placeholder: "ثبت اقدام جدید",
						className: "h-11 flex-1 rounded-md border border-line bg-surface px-3 text-sm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "h-11 rounded-md bg-navy px-4 text-sm text-paper",
						children: "ثبت"
					})]
				}),
				timeline.map((ev, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-2.5 rounded-full bg-brass" }), i < timeline.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-px flex-1 bg-line" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									ev.date,
									" · ",
									ev.time
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: ev.title
							}),
							ev.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: ev.description
							})
						]
					})]
				}, ev.id)),
				timeline.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "اقدامی ثبت نشده."
				})
			]
		}),
		tab === "docs" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mb-4 flex flex-col gap-2 sm:flex-row",
				onSubmit: (e) => {
					e.preventDefault();
					if (!docTitle.trim()) return;
					addDocument(id, docTitle, "سند");
					setDocTitle("");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: docTitle,
					onChange: (e) => setDocTitle(e.target.value),
					placeholder: "عنوان سند",
					className: "h-11 flex-1 rounded-md border border-line bg-surface px-3 text-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-md bg-navy px-4 text-sm text-paper",
					children: "افزودن"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [documents.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between rounded-md border border-line bg-surface px-4 py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-3 text-muted",
						children: [
							d.kind,
							" · ",
							d.createdAt,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-navy underline",
								onClick: () => {
									const title = window.prompt("عنوان سند", d.title);
									if (title?.trim()) updateDocument(d.id, { title: title.trim() });
								},
								children: "ویرایش"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-danger",
								onClick: () => {
									if (window.confirm(`سند «${d.title}» حذف شود؟`)) deleteDocument(d.id);
								},
								children: "حذف"
							})
						]
					})]
				}, d.id)), documents.length === 0 && petitions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "سندی نیست."
				})]
			}),
			petitions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 text-sm font-semibold text-navy",
					children: "لوایح ذخیره‌شده"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: petitions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 rounded-md border border-line bg-surface px-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: p.updatedAt
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/editor",
								search: { caseId: id },
								className: "h-11 inline-flex items-center text-sm text-brass",
								children: "ویرایش"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 rounded-md border border-line px-3 text-sm",
								onClick: () => printLegalDoc({
									officeName: office?.name ?? "دفتر وکالت",
									lawyerName: office?.lawyerName ?? "",
									barNumber: office?.barNumber,
									heading: p.title,
									meta: caseItem.title,
									body: p.body
								}),
								children: "چاپ"
							})]
						})]
					}, p.id))
				})]
			})
		] }),
		tab === "deadlines" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-4 grid gap-2 sm:grid-cols-[1fr_10rem_auto]",
			onSubmit: (e) => {
				e.preventDefault();
				if (!dlTitle.trim() || !dlDate.trim()) return;
				addDeadline({
					title: dlTitle,
					caseId: id,
					dueDate: dlDate,
					type: "internal",
					isUrgent: false,
					legalArticle: "",
					ruleCode: "CUSTOM"
				});
				setDlTitle("");
				setDlDate("");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: dlTitle,
					onChange: (e) => setDlTitle(e.target.value),
					placeholder: "عنوان موعد",
					className: "h-11 rounded-md border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: dlDate,
					onChange: (e) => setDlDate(e.target.value),
					placeholder: "۱۴۰۵/۰۸/۰۱",
					className: "h-11 rounded-md border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-md bg-navy px-4 text-sm text-paper",
					children: "افزودن"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: deadlines.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => toggleDeadline(d.id),
				className: "flex w-full items-start justify-between rounded-md border border-line bg-surface p-4 text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: d.isCompleted ? "text-muted line-through" : "font-medium",
						children: d.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: d.legalArticle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadlineBadge, { type: d.type })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: d.isUrgent && !d.isCompleted ? "text-sm text-danger" : "text-sm text-muted",
					children: d.dueDate
				})]
			}, d.id))
		})] }),
		tab === "finance" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "grid gap-2 rounded-xl border border-line bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4",
					onSubmit: (e) => {
						e.preventDefault();
						const n = parseAmount(txAmount);
						if (!n) {
							toast.error("مبلغ معتبر وارد کنید.");
							return;
						}
						addTransaction({
							caseId: id,
							type: txType,
							amount: n,
							description: txDesc || txLabel[txType],
							date: todayJalali(),
							isTrust: txType === "trust_in" || txType === "trust_out"
						});
						setTxAmount("");
						setTxDesc("");
						toast.success("تراکنش ثبت شد.");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: txType,
							onChange: (e) => setTxType(e.target.value),
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
							value: txAmount,
							onChange: (e) => setTxAmount(e.target.value),
							placeholder: "مبلغ ریال",
							className: "h-11 rounded-md border border-line bg-paper px-3 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: txDesc,
							onChange: (e) => setTxDesc(e.target.value),
							placeholder: "شرح",
							className: "h-11 rounded-md border border-line bg-paper px-3 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "h-11 rounded-md bg-navy text-sm text-paper",
							children: "ثبت تراکنش"
						})
					]
				}),
				txs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between rounded-md border border-line bg-surface px-4 py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						txLabel[t.type],
						" · ",
						t.description
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: money(t.amount)
					})]
				}, t.id)),
				txs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "تراکنشی نیست."
				})
			]
		}),
		tab === "notes" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-4 space-y-2",
			onSubmit: (e) => {
				e.preventDefault();
				if (!note.trim()) return;
				addNote(id, note);
				setNote("");
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: note,
				onChange: (e) => setNote(e.target.value),
				className: "min-h-24 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm",
				placeholder: "یادداشت داخلی"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "h-11 rounded-md bg-navy px-4 text-sm text-paper",
				children: "ذخیره یادداشت"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-line bg-surface p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: n.createdAt
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1",
					children: n.body
				})]
			}, n.id))
		})] }),
		tab === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "پیش‌نویس بر اساس همین پرونده. متن باید پیش از تقدیم بازبینی شود."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [[
						["petition", "دادخواست"],
						["defense", "دفاعیه"],
						["appeal", "تجدیدنظر"]
					].map(([kind, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: aiBusy,
						className: kind === "petition" ? "h-11 rounded-md bg-navy px-4 text-sm text-paper disabled:opacity-60" : "h-11 rounded-md border border-line px-4 text-sm disabled:opacity-60",
						onClick: async () => {
							setAiBusy(true);
							setAiHint("");
							const facts = [
								`موکل: ${client?.fullName ?? "نامشخص"}`,
								`موضوع: ${caseItem.title}`,
								`مرجع: ${caseItem.court} ${caseItem.branch}`,
								`کلاسه: ${caseItem.caseNumber || "—"}`,
								`خواسته: ${caseItem.claimAmount}`,
								`شرح: ${caseItem.description}`
							].join("\n");
							try {
								const res = getDesktopBridge() ? await askDesktopAi({
									query: `یک پیش‌نویس ${kind === "petition" ? "دادخواست" : kind === "defense" ? "لایحه دفاعیه" : "تجدیدنظرخواهی"} بر اساس اطلاعات پرونده تهیه کن. موارد مجهول را با جای خالی مشخص کن و هیچ واقعیت یا استناد قانونی نساز.`,
									officeBrief: facts,
									messages: [],
									sources: retrieveSources(`${kind}\n${facts}`, 4).map(({ id, title, article, summary }) => ({
										id,
										title,
										article,
										summary
									}))
								}) : await generateDraft({ data: {
									kind,
									facts
								} });
								if (res?.ok) {
									setDraft(res.text);
									setAiHint("متن با مدل هوشمند تولید شد.");
								} else {
									setDraft(draftPetition(kind, caseItem, client));
									setAiHint("الگوی حقوقی دفتر اعمال شد.");
								}
							} catch {
								setDraft(draftPetition(kind, caseItem, client));
								setAiHint("الگوی حقوقی دفتر اعمال شد.");
							} finally {
								setAiBusy(false);
							}
						},
						children: aiBusy ? "در حال نگارش..." : label
					}, kind)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/assistant",
						search: {
							caseId: id,
							q: `برای پرونده «${caseItem.title}» راهبرد لایحه دفاعیه پیشنهاد بده.`
						},
						className: "inline-flex h-11 items-center rounded-md border border-line px-4 text-sm",
						children: "گفتگو با دستیار"
					})]
				}),
				aiHint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: aiHint
				}),
				draft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "whitespace-pre-wrap rounded-xl border border-line bg-surface p-4 text-sm leading-7",
					children: draft
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "h-11 rounded-md bg-navy px-4 text-sm text-paper",
							onClick: () => {
								savePetition({
									caseId: id,
									title: "پیش‌نویس هوشمند",
									body: draft
								});
								toast.success("در پرونده ذخیره شد.");
							},
							children: "ذخیره در پرونده"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "h-11 rounded-md border border-line px-4 text-sm",
							onClick: async () => toast.success(await copyText(draft) ? "متن کپی شد." : "کپی انجام نشد."),
							children: "کپی"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "h-11 rounded-md border border-line px-4 text-sm",
							onClick: () => printLegalDoc({
								officeName: office?.name ?? "دفتر وکالت",
								lawyerName: office?.lawyerName ?? "",
								barNumber: office?.barNumber,
								heading: "پیش‌نویس هوشمند",
								meta: caseItem.title,
								body: draft
							}),
							children: "چاپ"
						})
					]
				})] })
			]
		})
	] });
}
function Mini({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-medium",
			children: value
		})]
	});
}
//#endregion
export { CaseDetail as component };
