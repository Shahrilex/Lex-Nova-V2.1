import { n as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { l as parseJalali } from "./jalali-BQNfiI_Q.mjs";
import { n as deadlineRules } from "./deadline-engine-Cw4DJRaM.mjs";
import { t as legalLibrary } from "./legal-library-Do-81LeP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/retrieve-Dy1RCxB0.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var STOP = /* @__PURE__ */ new Set([
	"از",
	"تا",
	"به",
	"در",
	"با",
	"که",
	"را",
	"این",
	"آن",
	"برای",
	"یک",
	"هم",
	"یا",
	"اگر",
	"چه",
	"است",
	"شود",
	"کن",
	"کنم",
	"کنید",
	"بگو",
	"بررسی",
	"گام",
	"بعدی",
	"پرونده",
	"مطالبه",
	"چگونه",
	"کنم"
]);
var BOOST = [
	{
		keys: [
			"تجدیدنظر",
			"۳۳۶",
			"336"
		],
		ids: ["s1", "s2"]
	},
	{
		keys: [
			"واخواهی",
			"غیابی",
			"۳۰۶"
		],
		ids: ["s4", "s2"]
	},
	{
		keys: [
			"کارشناس",
			"کارشناسی",
			"۲۶۰"
		],
		ids: ["s3"]
	},
	{
		keys: [
			"چک",
			"تأخیر",
			"۷۳۳",
			"733"
		],
		ids: ["s5", "s13"]
	},
	{
		keys: [
			"خلع",
			"غصب",
			"ید"
		],
		ids: ["s7"]
	},
	{
		keys: [
			"طلاق",
			"سازش",
			"خانواده"
		],
		ids: ["s8", "s16"]
	},
	{
		keys: [
			"تمبر",
			"۱۰۳",
			"103",
			"مالیات"
		],
		ids: ["s6"]
	},
	{
		keys: [
			"امانی",
			"وجوه",
			"حساب"
		],
		ids: ["s11"]
	},
	{
		keys: ["نقص", "دادخواست"],
		ids: ["s12", "s14"]
	},
	{
		keys: ["فرجام", "دیوان"],
		ids: ["s10"]
	},
	{
		keys: [
			"مهریه",
			"نفقه",
			"حضانت"
		],
		ids: ["s16", "s17"]
	},
	{
		keys: [
			"اثبات",
			"دلیل",
			"۱۲۵۷"
		],
		ids: ["s15"]
	},
	{
		keys: [
			"التزام",
			"وجه التزام",
			"قرارداد"
		],
		ids: ["s9", "s18"]
	},
	{
		keys: [
			"دستور",
			"موقت",
			"تأمین"
		],
		ids: ["s19"]
	},
	{
		keys: ["مسئولیت", "خسارت"],
		ids: ["s20"]
	}
];
function tokenize(query) {
	return query.split(/[^\u0600-\u06FFa-zA-Z0-9۰-۹٠-٩]+/).map((t) => t.trim()).filter((t) => t.length >= 2 && !STOP.has(t));
}
function retrieveSources(query, limit = 5) {
	const tokens = tokenize(query);
	const boosted = /* @__PURE__ */ new Set();
	for (const row of BOOST) if (row.keys.some((k) => query.includes(k))) for (const id of row.ids) boosted.add(id);
	return legalLibrary.map((s) => {
		const hay = `${s.title} ${s.article} ${s.summary} ${s.citation}`;
		let score = boosted.has(s.id) ? 8 : 0;
		for (const t of tokens) if (hay.includes(t)) score += t.length > 3 ? 2 : 1;
		return {
			s,
			score
		};
	}).filter((x) => x.score > 1).sort((a, b) => b.score - a.score).slice(0, limit).map((x) => x.s);
}
function matchDeadlineRule(query) {
	return deadlineRules.map((r) => {
		let score = 0;
		if (query.includes(r.title)) score += 5;
		if (query.includes(r.code)) score += 4;
		const keys = r.title.split(/\s+/);
		for (const k of keys) if (k.length > 2 && query.includes(k)) score += 1;
		return {
			r,
			score
		};
	}).filter((x) => x.score > 0).sort((a, b) => b.score - a.score)[0]?.r;
}
function extractNoticeDate(query) {
	const m = query.match(/(\d{4}[/-]\d{1,2}[/-]\d{1,2})|([۰-۹]{4}[/-][۰-۹]{1,2}[/-][۰-۹]{1,2})/);
	if (!m) return null;
	return parseJalali(m[0]) ? m[0] : null;
}
//#endregion
export { retrieveSources as i, extractNoticeDate as n, matchDeadlineRule as r, createServerRpc as t };
