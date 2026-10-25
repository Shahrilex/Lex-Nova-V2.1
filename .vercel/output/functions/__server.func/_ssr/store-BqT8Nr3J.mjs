import { l as todayJalali, o as nowTime, u as uid } from "./utils-C78POfLB.mjs";
import { i as create, n as createJSONStorage, r as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-BqT8Nr3J.js
var seedClients = [
	{
		id: "c1",
		fullName: "علی محمدی",
		nationalCode: "0012345678",
		mobile: "09121234567",
		type: "individual",
		address: "تهران، خیابان ولیعصر، پلاک ۲۱۰",
		email: "ali.m@example.com",
		notes: "موکل قدیمی. پیگیری چک‌های برگشتی.",
		createdAt: "۱۴۰۴/۰۳/۱۲"
	},
	{
		id: "c2",
		fullName: "شرکت پارس تجارت",
		nationalCode: "14004567890",
		mobile: "02188776655",
		type: "company",
		address: "تهران، سعادت‌آباد، برج آسمان",
		email: "legal@parstejarat.ir",
		notes: "واحد حقوقی فعال. پرونده ملکی در جریان.",
		createdAt: "۱۴۰۴/۰۲/۰۱"
	},
	{
		id: "c3",
		fullName: "زهرا احمدی",
		nationalCode: "0023456789",
		mobile: "09129876543",
		type: "individual",
		address: "کرج، مهرشهر",
		email: "",
		notes: "پرونده خانواده.",
		createdAt: "۱۴۰۵/۰۶/۱۸"
	},
	{
		id: "c4",
		fullName: "حسین رضایی",
		nationalCode: "0034567890",
		mobile: "09351234567",
		type: "individual",
		address: "اصفهان، خیابان چهارباغ",
		email: "h.rezaei@example.com",
		notes: "پرونده ملکی مختومه.",
		createdAt: "۱۴۰۴/۱۱/۰۸"
	},
	{
		id: "c5",
		fullName: "مریم کریمی",
		nationalCode: "0045678901",
		mobile: "09121112233",
		type: "individual",
		address: "شیراز، بلوار زند",
		email: "",
		notes: "مشاوره اولیه؛ هنوز پرونده تشکیل نشده.",
		createdAt: "۱۴۰۵/۰۷/۰۲"
	}
];
var seedCases = [
	{
		id: "p1",
		title: "مطالبه وجه چک",
		caseNumber: "۱۴۰۵/۱۲۳۴",
		courtNumber: "۱۴۰۵۱۲۳۴",
		status: "active",
		caseType: "civil",
		court: "مجتمع قضایی شهید بهشتی",
		branch: "شعبه ۵ حقوقی",
		clientId: "c1",
		openedAt: "۱۴۰۵/۰۶/۱۲",
		claimAmount: "250000000",
		description: "مطالبه وجه چک به شماره ۱۲۳۴۵۶ مورخ ۱۴۰۴/۱۱/۲۰ به انضمام خسارت تأخیر تأدیه مستند به رأی وحدت رویه ۷۳۳."
	},
	{
		id: "p2",
		title: "خلع ید و قلع بنا",
		caseNumber: "۱۴۰۵/۵۶۷۸",
		courtNumber: "۱۴۰۵۵۶۷۸",
		status: "active",
		caseType: "civil",
		court: "مجتمع قضایی صدر",
		branch: "شعبه ۱۲ حقوقی",
		clientId: "c2",
		openedAt: "۱۴۰۵/۰۵/۲۰",
		claimAmount: "0",
		description: "خلع ید از پلاک ثبتی ۱۲/۴۵ و قلع بنای احداثی بدون مجوز. نظریه کارشناسی واصل شده."
	},
	{
		id: "p3",
		title: "طلاق توافقی",
		caseNumber: "۱۴۰۵/۹۰۱۲",
		courtNumber: "۱۴۰۵۹۰۱۲",
		status: "active",
		caseType: "family",
		court: "مجتمع قضایی خانواده ۲",
		branch: "شعبه ۲",
		clientId: "c3",
		openedAt: "۱۴۰۵/۰۷/۰۱",
		claimAmount: "0",
		description: "درخواست صدور گواهی عدم امکان سازش به صورت توافقی."
	},
	{
		id: "p4",
		title: "دعوای ملکی",
		caseNumber: "۱۴۰۴/۳۳۴۴",
		courtNumber: "۱۴۰۴۳۳۴۴",
		status: "closed",
		caseType: "civil",
		court: "شعبه ۸ حقوقی تهران",
		branch: "شعبه ۸",
		clientId: "c4",
		openedAt: "۱۴۰۴/۱۱/۱۵",
		claimAmount: "1800000000",
		description: "پرونده مختومه. حکم قطعی صادر شده است."
	},
	{
		id: "p5",
		title: "مطالبه مهریه",
		caseNumber: "۱۴۰۵/۷۷۸۸",
		courtNumber: "",
		status: "draft",
		caseType: "family",
		court: "",
		branch: "",
		clientId: "c3",
		openedAt: "۱۴۰۵/۰۷/۱۰",
		claimAmount: "50000",
		description: "پیش‌نویس دادخواست مطالبه مهریه عندالمطالبه."
	}
];
var seedParties = [
	{
		id: "pa1",
		caseId: "p1",
		role: "client_side",
		fullName: "علی محمدی",
		nationalCode: "0012345678",
		notes: "خواهان"
	},
	{
		id: "pa2",
		caseId: "p1",
		role: "opponent",
		fullName: "شرکت نگین تجارت",
		nationalCode: "14001112233",
		notes: "صادرکننده چک"
	},
	{
		id: "pa3",
		caseId: "p2",
		role: "client_side",
		fullName: "شرکت پارس تجارت",
		nationalCode: "14004567890",
		notes: "مالک رسمی"
	},
	{
		id: "pa4",
		caseId: "p2",
		role: "opponent",
		fullName: "حسین رضایی",
		nationalCode: "0034567890",
		notes: "متصرف عدوانی — با موکل دفتر هم‌کد ملی است"
	},
	{
		id: "pa5",
		caseId: "p3",
		role: "client_side",
		fullName: "زهرا احمدی",
		nationalCode: "0023456789",
		notes: "زوجه"
	},
	{
		id: "pa6",
		caseId: "p3",
		role: "opponent",
		fullName: "کیوان احمدی",
		nationalCode: "0056789012",
		notes: "زوج"
	}
];
var seedDeadlines = [
	{
		id: "d1",
		title: "مهلت تجدیدنظرخواهی",
		caseId: "p1",
		dueDate: "۱۴۰۵/۰۷/۱۸",
		type: "legal",
		isUrgent: true,
		isCompleted: false,
		legalArticle: "ماده ۳۳۶ قانون آیین دادرسی مدنی",
		ruleCode: "REV-20"
	},
	{
		id: "d2",
		title: "اعتراض به نظریه کارشناسی",
		caseId: "p2",
		dueDate: "۱۴۰۵/۰۷/۱۲",
		type: "legal",
		isUrgent: true,
		isCompleted: false,
		legalArticle: "ماده ۲۶۰ قانون آیین دادرسی مدنی",
		ruleCode: "EXPERT-OBJ-7"
	},
	{
		id: "d3",
		title: "آماده‌سازی لایحه دفاعیه",
		caseId: "p1",
		dueDate: "۱۴۰۵/۰۷/۱۵",
		type: "internal",
		isUrgent: false,
		isCompleted: false,
		legalArticle: "",
		ruleCode: "INTERNAL-PREPARE"
	},
	{
		id: "d4",
		title: "جلسه رسیدگی",
		caseId: "p3",
		dueDate: "۱۴۰۵/۰۷/۲۲",
		type: "court",
		isUrgent: false,
		isCompleted: false,
		legalArticle: "",
		ruleCode: "HEARING"
	},
	{
		id: "d5",
		title: "سررسید قسط دوم حق‌الوکاله",
		caseId: "p2",
		dueDate: "۱۴۰۵/۰۸/۰۱",
		type: "financial",
		isUrgent: false,
		isCompleted: false,
		legalArticle: "",
		ruleCode: "PAYMENT-INSTALL"
	}
];
var seedTimeline = [
	{
		id: "t1",
		caseId: "p1",
		date: "۱۴۰۵/۰۷/۰۱",
		time: "۱۰:۳۰",
		title: "ثبت لایحه دفاعیه تکمیلی",
		description: "لایحه با استناد به نظریه کارشناسی ارسال شد.",
		type: "document"
	},
	{
		id: "t2",
		caseId: "p1",
		date: "۱۴۰۵/۰۶/۲۵",
		time: "۱۴:۱۵",
		title: "جلسه رسیدگی",
		description: "جلسه اول برگزار شد. قرار کارشناسی صادر گردید.",
		type: "hearing"
	},
	{
		id: "t3",
		caseId: "p1",
		date: "۱۴۰۵/۰۶/۱۸",
		time: "۰۹:۰۰",
		title: "ابلاغ دادخواست به خوانده",
		description: "",
		type: "action"
	},
	{
		id: "t4",
		caseId: "p1",
		date: "۱۴۰۵/۰۶/۱۲",
		time: "۱۱:۲۰",
		title: "تشکیل پرونده و ثبت دادخواست",
		description: "",
		type: "action"
	},
	{
		id: "t5",
		caseId: "p2",
		date: "۱۴۰۵/۰۷/۰۵",
		time: "۱۶:۰۰",
		title: "دریافت نظریه کارشناسی",
		description: "مهلت اعتراض ۷ روز از ابلاغ.",
		type: "document"
	},
	{
		id: "t6",
		caseId: "p2",
		date: "۱۴۰۵/۰۵/۲۰",
		time: "۱۰:۰۰",
		title: "تشکیل پرونده",
		description: "",
		type: "action"
	},
	{
		id: "t7",
		caseId: "p3",
		date: "۱۴۰۵/۰۷/۰۱",
		time: "۱۲:۰۰",
		title: "ثبت درخواست طلاق توافقی",
		description: "",
		type: "action"
	}
];
var seedDocuments = [
	{
		id: "doc1",
		caseId: "p1",
		title: "دادخواست مطالبه وجه",
		kind: "دادخواست",
		createdAt: "۱۴۰۵/۰۶/۱۲"
	},
	{
		id: "doc2",
		caseId: "p1",
		title: "لایحه دفاعیه تکمیلی",
		kind: "لایحه",
		createdAt: "۱۴۰۵/۰۷/۰۱"
	},
	{
		id: "doc3",
		caseId: "p1",
		title: "تصویر چک",
		kind: "مدرک",
		createdAt: "۱۴۰۵/۰۶/۱۲"
	},
	{
		id: "doc4",
		caseId: "p2",
		title: "نظریه کارشناسی",
		kind: "کارشناسی",
		createdAt: "۱۴۰۵/۰۷/۰۵"
	},
	{
		id: "doc5",
		caseId: "p3",
		title: "گواهی عدم سازش (پیش‌نویس)",
		kind: "لایحه",
		createdAt: "۱۴۰۵/۰۷/۰۱"
	}
];
var seedNotes = [{
	id: "n1",
	caseId: "p1",
	body: "قاضی نسبت به خسارت تأخیر حساس است. استناد به رأی وحدت رویه ۷۳۳ آماده شود.",
	createdAt: "۱۴۰۵/۰۶/۲۵"
}, {
	id: "n2",
	caseId: "p2",
	body: "موکل سند مالکیت رسمی را فردا می‌آورد.",
	createdAt: "۱۴۰۵/۰۷/۰۵"
}];
var seedTransactions = [
	{
		id: "f1",
		caseId: "p1",
		type: "income",
		amount: 8e7,
		description: "قسط اول حق‌الوکاله",
		date: "۱۴۰۵/۰۶/۱۲",
		isTrust: false
	},
	{
		id: "f2",
		caseId: "p1",
		type: "trust_in",
		amount: 15e6,
		description: "هزینه دادرسی امانی",
		date: "۱۴۰۵/۰۶/۱۲",
		isTrust: true
	},
	{
		id: "f3",
		caseId: "p1",
		type: "stamp",
		amount: 4e6,
		description: "تمبر ماده ۱۰۳",
		date: "۱۴۰۵/۰۶/۱۳",
		isTrust: false
	},
	{
		id: "f4",
		caseId: "p2",
		type: "income",
		amount: 12e7,
		description: "حق‌الوکاله مرحله بدوی",
		date: "۱۴۰۵/۰۵/۲۱",
		isTrust: false
	},
	{
		id: "f5",
		caseId: "p2",
		type: "trust_in",
		amount: 25e6,
		description: "علی‌الحساب کارشناسی",
		date: "۱۴۰۵/۰۶/۰۱",
		isTrust: true
	},
	{
		id: "f6",
		caseId: "p3",
		type: "income",
		amount: 4e7,
		description: "حق‌الوکاله طلاق توافقی",
		date: "۱۴۰۵/۰۷/۰۱",
		isTrust: false
	}
];
var seedPetitions = [{
	id: "e1",
	caseId: "p1",
	title: "لایحه تجدیدنظرخواهی",
	body: "ریاست محترم دادگاه تجدیدنظر استان تهران\nبا سلام\nاحتراماً در خصوص دادنامه شماره ۱۴۰۵/۱۲۳۴ صادره از شعبه ۵ حقوقی مجتمع شهید بهشتی، مراتب اعتراض اینجانب به شرح ذیل به استحضار می‌رسد...",
	updatedAt: "۱۴۰۵/۰۷/۰۲"
}];
var seedHearings = [
	{
		id: "h1",
		caseId: "p1",
		date: "۱۴۰۵/۰۶/۲۵",
		time: "۱۴:۱۵",
		court: "مجتمع قضایی شهید بهشتی",
		branch: "شعبه ۵ حقوقی",
		subject: "رسیدگی بدوی",
		result: "قرار کارشناسی صادر شد"
	},
	{
		id: "h2",
		caseId: "p3",
		date: "۱۴۰۵/۰۷/۲۲",
		time: "۱۰:۰۰",
		court: "مجتمع قضایی خانواده ۲",
		branch: "شعبه ۲",
		subject: "جلسه سازش",
		result: ""
	},
	{
		id: "h3",
		caseId: "p2",
		date: "۱۴۰۵/۰۷/۲۸",
		time: "۱۱:۳۰",
		court: "مجتمع قضایی صدر",
		branch: "شعبه ۱۲ حقوقی",
		subject: "ادامه رسیدگی پس از کارشناسی",
		result: ""
	}
];
var seedMembers = [
	{
		id: "m1",
		fullName: "مهدی رضایی",
		role: "owner",
		mobile: "09121234567"
	},
	{
		id: "m2",
		fullName: "سارا نوری",
		role: "trainee",
		mobile: "09123334455"
	},
	{
		id: "m3",
		fullName: "نیما کاظمی",
		role: "secretary",
		mobile: "09124445566"
	},
	{
		id: "m4",
		fullName: "لیلا مرادی",
		role: "accountant",
		mobile: "09125556677"
	}
];
var seedNotices = [
	{
		id: "nt1",
		title: "موعد فوری تجدیدنظر",
		body: "مهلت تجدیدنظر پرونده مطالبه وجه چک رو به اتمام است.",
		date: "۱۴۰۵/۰۷/۰۵",
		read: false,
		href: "/deadlines"
	},
	{
		id: "nt2",
		title: "تعارض منافع احتمالی",
		body: "حسین رضایی هم موکل دفتر است و هم خوانده پرونده خلع ید.",
		date: "۱۴۰۵/۰۷/۰۴",
		read: false,
		href: "/conflict"
	},
	{
		id: "nt3",
		title: "جلسه خانواده",
		body: "جلسه سازش زهرا احمدی در ۲۲ مهر ساعت ۱۰.",
		date: "۱۴۰۵/۰۷/۰۳",
		read: true,
		href: "/calendar"
	},
	{
		id: "nt4",
		title: "دستیار هوشمند آماده است",
		body: "موعد تجدیدنظر چک و اعتراض کارشناسی را از گفتگوی حقوقی بپرسید.",
		date: "۱۴۰۵/۰۷/۰۵",
		read: false,
		href: "/assistant"
	}
];
var caseTypeLabel = {
	civil: "حقوقی",
	criminal: "کیفری",
	family: "خانواده",
	commercial: "تجاری",
	administrative: "اداری"
};
var statusLabel = {
	active: "فعال",
	closed: "مختومه",
	draft: "پیش‌نویس"
};
var deadlineTypeLabel = {
	legal: "قانونی",
	internal: "داخلی",
	court: "دادگاه",
	financial: "مالی"
};
var txLabel = {
	income: "دریافت حق‌الوکاله",
	expense: "هزینه",
	trust_in: "واریز امانی",
	trust_out: "برداشت امانی",
	stamp: "تمبر ماده ۱۰۳"
};
var partyRoleLabel = {
	client_side: "طرف موکل",
	opponent: "طرف مقابل",
	third: "ثالث",
	opp_counsel: "وکیل طرف مقابل"
};
var memberRoleLabel = {
	owner: "مدیر دفتر",
	lawyer: "وکیل",
	trainee: "کارآموز",
	secretary: "منشی",
	accountant: "حسابدار"
};
var planLabel = {
	free: "آزاد",
	pro: "حرفه‌ای",
	ultra_pro: "اولترا"
};
var seedOffice = {
	name: "دفتر وکالت شهری",
	lawyerName: "",
	address: "تهران، خیابان کریمخان زند، پلاک ۴۸",
	phone: "02188881234",
	barNumber: "۱۲۳۴۵ کانون مرکز"
};
var DATABASE_NAME = "lex-nova";
var STORE_NAME = "workspace";
var LEGACY_KEY = "jurist-assistant-store-v2";
function legacyStorage() {
	if (typeof window === "undefined") return null;
	try {
		return window.localStorage;
	} catch {
		return null;
	}
}
function openDatabase() {
	return new Promise((resolve, reject) => {
		const request = window.indexedDB.open(DATABASE_NAME, 1);
		request.onupgradeneeded = () => {
			if (!request.result.objectStoreNames.contains(STORE_NAME)) request.result.createObjectStore(STORE_NAME);
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}
async function withStore(mode, operation) {
	const db = await openDatabase();
	try {
		return await new Promise((resolve, reject) => {
			const request = operation(db.transaction(STORE_NAME, mode).objectStore(STORE_NAME));
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	} finally {
		db.close();
	}
}
/**
* Durable, device-local persistence for the legal workspace.
*
* IndexedDB avoids the small storage quota and synchronous writes of localStorage.
* The old localStorage key is read once as a migration fallback, so existing demo
* data remains available after the upgrade.
*/
var indexedDbStorage = {
	async getItem(name) {
		if (typeof window === "undefined" || !("indexedDB" in window)) return legacyStorage()?.getItem(name) ?? null;
		try {
			const saved = await withStore("readonly", (store) => store.get(name));
			if (typeof saved === "string") return saved;
			const legacy = legacyStorage()?.getItem(name) ?? null;
			if (legacy && name === LEGACY_KEY) await withStore("readwrite", (store) => store.put(legacy, name));
			return legacy;
		} catch {
			return legacyStorage()?.getItem(name) ?? null;
		}
	},
	async setItem(name, value) {
		if (typeof window === "undefined" || !("indexedDB" in window)) {
			legacyStorage()?.setItem(name, value);
			return;
		}
		try {
			await withStore("readwrite", (store) => store.put(value, name));
		} catch {
			legacyStorage()?.setItem(name, value);
		}
	},
	async removeItem(name) {
		if (typeof window === "undefined" || !("indexedDB" in window)) {
			legacyStorage()?.removeItem(name);
			return;
		}
		try {
			await withStore("readwrite", (store) => store.delete(name));
		} catch {
			legacyStorage()?.removeItem(name);
		}
	}
};
var demoUser = (mobile) => ({
	id: "u1",
	fullName: "مهدی رضایی",
	mobile,
	role: "وکیل پایه یک",
	plan: "pro"
});
var initial = {
	clients: seedClients,
	cases: seedCases,
	parties: seedParties,
	deadlines: seedDeadlines,
	timeline: seedTimeline,
	documents: seedDocuments,
	notes: seedNotes,
	transactions: seedTransactions,
	petitions: seedPetitions,
	hearings: seedHearings,
	members: seedMembers,
	notices: seedNotices,
	chat: [],
	office: seedOffice
};
var useApp = create()(persist((set, get) => ({
	hydrated: false,
	user: null,
	pendingMobile: "",
	...initial,
	setHydrated: () => set({ hydrated: true }),
	setPendingMobile: (mobile) => set({ pendingMobile: mobile }),
	login: (mobile) => set({
		user: demoUser(mobile),
		pendingMobile: ""
	}),
	logout: () => set({ user: null }),
	addClient: (data) => {
		const exists = get().clients.find((c) => c.nationalCode && data.nationalCode && c.nationalCode === data.nationalCode);
		if (exists) return {
			ok: false,
			message: `احتمال تعارض منافع: کد ملی با موکل «${exists.fullName}» تکراری است.`
		};
		const asOpponent = get().parties.find((p) => p.nationalCode && data.nationalCode && p.nationalCode === data.nationalCode && p.role === "opponent");
		if (asOpponent) return {
			ok: false,
			message: `تعارض منافع: این کد ملی طرف مقابل پرونده «${get().cases.find((c) => c.id === asOpponent.caseId)?.title ?? asOpponent.caseId}» است.`
		};
		const id = uid();
		set((s) => ({ clients: [{
			...data,
			id,
			createdAt: todayJalali()
		}, ...s.clients] }));
		return {
			ok: true,
			message: "موکل ثبت شد.",
			id
		};
	},
	updateClient: (id, data) => set((s) => ({ clients: s.clients.map((c) => c.id === id ? {
		...c,
		...data
	} : c) })),
	deleteClient: (id) => set((s) => ({ clients: s.clients.filter((c) => c.id !== id) })),
	updateClientAttachments: (id, attachments) => set((s) => ({ clients: s.clients.map((c) => c.id === id ? {
		...c,
		attachments
	} : c) })),
	addCase: (data) => {
		const id = uid();
		const client = get().clients.find((c) => c.id === data.clientId);
		set((s) => ({
			cases: [{
				...data,
				id
			}, ...s.cases],
			timeline: [{
				id: uid(),
				caseId: id,
				date: todayJalali(),
				time: nowTime(),
				title: "تشکیل پرونده",
				description: data.title,
				type: "action"
			}, ...s.timeline],
			parties: client ? [{
				id: uid(),
				caseId: id,
				role: "client_side",
				fullName: client.fullName,
				nationalCode: client.nationalCode,
				notes: "موکل"
			}, ...s.parties] : s.parties
		}));
		return id;
	},
	updateCase: (id, data) => set((s) => ({ cases: s.cases.map((c) => c.id === id ? {
		...c,
		...data
	} : c) })),
	updateCaseAttachments: (id, attachments) => set((s) => ({ cases: s.cases.map((c) => c.id === id ? {
		...c,
		attachments
	} : c) })),
	deleteCase: (id) => set((s) => ({
		cases: s.cases.filter((item) => item.id !== id),
		parties: s.parties.filter((item) => item.caseId !== id),
		deadlines: s.deadlines.filter((item) => item.caseId !== id),
		timeline: s.timeline.filter((item) => item.caseId !== id),
		documents: s.documents.filter((item) => item.caseId !== id),
		notes: s.notes.filter((item) => item.caseId !== id),
		transactions: s.transactions.filter((item) => item.caseId !== id),
		petitions: s.petitions.filter((item) => item.caseId !== id),
		hearings: s.hearings.filter((item) => item.caseId !== id)
	})),
	addParty: (data) => set((s) => ({ parties: [{
		...data,
		id: uid()
	}, ...s.parties] })),
	addDeadline: (data) => set((s) => ({ deadlines: [{
		...data,
		id: uid(),
		isCompleted: false
	}, ...s.deadlines] })),
	toggleDeadline: (id) => set((s) => ({ deadlines: s.deadlines.map((d) => d.id === id ? {
		...d,
		isCompleted: !d.isCompleted
	} : d) })),
	addTimeline: (caseId, title, description, type) => set((s) => ({ timeline: [{
		id: uid(),
		caseId,
		date: todayJalali(),
		time: nowTime(),
		title,
		description,
		type
	}, ...s.timeline] })),
	addNote: (caseId, body) => set((s) => ({ notes: [{
		id: uid(),
		caseId,
		body,
		createdAt: todayJalali()
	}, ...s.notes] })),
	addDocument: (caseId, title, kind, attachment) => set((s) => ({
		documents: [{
			id: uid(),
			caseId,
			title,
			kind,
			createdAt: todayJalali(),
			attachment
		}, ...s.documents],
		timeline: [{
			id: uid(),
			caseId,
			date: todayJalali(),
			time: nowTime(),
			title: `ثبت سند: ${title}`,
			description: kind,
			type: "document"
		}, ...s.timeline]
	})),
	deleteDocument: (id) => set((s) => ({ documents: s.documents.filter((item) => item.id !== id) })),
	updateDocument: (id, data) => set((s) => ({ documents: s.documents.map((item) => item.id === id ? {
		...item,
		...data
	} : item) })),
	addTransaction: (data) => set((s) => ({ transactions: [{
		...data,
		id: uid()
	}, ...s.transactions] })),
	savePetition: (data) => {
		const id = data.id ?? uid();
		set((s) => {
			const exists = s.petitions.some((p) => p.id === id);
			const next = {
				id,
				caseId: data.caseId,
				title: data.title,
				body: data.body,
				updatedAt: todayJalali()
			};
			return { petitions: exists ? s.petitions.map((p) => p.id === id ? next : p) : [next, ...s.petitions] };
		});
		return id;
	},
	addHearing: (data) => set((s) => ({
		hearings: [{
			...data,
			id: uid()
		}, ...s.hearings],
		timeline: [{
			id: uid(),
			caseId: data.caseId,
			date: data.date,
			time: data.time,
			title: `جلسه: ${data.subject}`,
			description: data.court,
			type: "hearing"
		}, ...s.timeline]
	})),
	updateHearing: (id, data) => set((s) => ({ hearings: s.hearings.map((h) => h.id === id ? {
		...h,
		...data
	} : h) })),
	addMember: (data) => set((s) => ({ members: [...s.members, {
		...data,
		id: uid()
	}] })),
	updateMember: (id, data) => set((s) => ({ members: s.members.map((item) => item.id === id ? {
		...item,
		...data
	} : item) })),
	deleteMember: (id) => set((s) => ({ members: s.members.filter((item) => item.id !== id) })),
	markNotice: (id) => set((s) => ({ notices: s.notices.map((n) => n.id === id ? {
		...n,
		read: true
	} : n) })),
	pushChat: (turn) => set((s) => ({ chat: [...s.chat, turn].slice(-40) })),
	clearChat: () => set({ chat: [] }),
	updateOffice: (data) => set((s) => ({ office: {
		...s.office,
		...data
	} })),
	restoreBackup: (backup) => set({
		office: backup.office,
		clients: backup.clients,
		cases: backup.cases,
		parties: backup.parties,
		deadlines: backup.deadlines,
		timeline: backup.timeline,
		documents: backup.documents,
		notes: backup.notes,
		transactions: backup.transactions,
		petitions: backup.petitions,
		hearings: backup.hearings,
		members: backup.members,
		notices: backup.notices,
		chat: backup.chat
	}),
	resetDemo: () => set({ ...initial })
}), {
	name: "jurist-assistant-store-v2",
	storage: createJSONStorage(() => indexedDbStorage),
	partialize: (s) => ({
		user: s.user,
		clients: s.clients,
		cases: s.cases,
		parties: s.parties,
		deadlines: s.deadlines,
		timeline: s.timeline,
		documents: s.documents,
		notes: s.notes,
		transactions: s.transactions,
		petitions: s.petitions,
		hearings: s.hearings,
		members: s.members,
		notices: s.notices,
		chat: s.chat,
		office: s.office
	}),
	onRehydrateStorage: () => (state) => {
		if (state && !state.office) state.office = seedOffice;
		if (state?.office?.lawyerName === "مهدی رضایی") state.updateOffice({ lawyerName: "" });
		if (state && !state.chat) state.chat = [];
		state?.setHydrated();
	}
}));
//#endregion
export { planLabel as a, useApp as c, partyRoleLabel as i, deadlineTypeLabel as n, statusLabel as o, memberRoleLabel as r, txLabel as s, caseTypeLabel as t };
