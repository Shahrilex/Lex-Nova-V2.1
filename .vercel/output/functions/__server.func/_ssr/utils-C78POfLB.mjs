import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-C78POfLB.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return crypto.randomUUID();
}
function fromFaDigits(value) {
	const fa = "۰۱۲۳۴۵۶۷۸۹";
	const ar = "٠١٢٣٤٥٦٧٨٩";
	return value.replace(/[۰-۹٠-٩]/g, (d) => {
		const i = fa.indexOf(d);
		if (i >= 0) return String(i);
		const j = ar.indexOf(d);
		return j >= 0 ? String(j) : d;
	});
}
function toFaDigits(value) {
	const map = [
		"۰",
		"۱",
		"۲",
		"۳",
		"۴",
		"۵",
		"۶",
		"۷",
		"۸",
		"۹"
	];
	return String(value).replace(/\d/g, (d) => map[Number(d)] ?? d);
}
function todayJalali() {
	try {
		return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit"
		}).format(/* @__PURE__ */ new Date());
	} catch {
		return "۱۴۰۵/۰۷/۱۲";
	}
}
function nowTime() {
	try {
		return new Intl.DateTimeFormat("fa-IR", {
			hour: "2-digit",
			minute: "2-digit"
		}).format(/* @__PURE__ */ new Date());
	} catch {
		return "۱۲:۰۰";
	}
}
function isIranMobile(value) {
	return /^09\d{9}$/.test(fromFaDigits(value).replace(/\D/g, ""));
}
function parseAmount(value) {
	const n = Number(fromFaDigits(value).replace(/[,\s_]/g, ""));
	return Number.isFinite(n) ? n : 0;
}
function isIranNationalCode(value) {
	const d = fromFaDigits(value).replace(/\D/g, "");
	if (!/^\d{10}$/.test(d) || /^(\d)\1{9}$/.test(d)) return false;
	const digits = d.split("").map(Number);
	const r = digits.slice(0, 9).reduce((a, n, i) => a + n * (10 - i), 0) % 11;
	return digits[9] === (r < 2 ? r : 11 - r);
}
function isIranLegalId(value, type) {
	const d = fromFaDigits(value).replace(/\D/g, "");
	if (type === "company") return /^\d{11}$/.test(d);
	return isIranNationalCode(d);
}
function money(n) {
	return `${toFaDigits(Math.round(n).toLocaleString("en-US"))} ریال`;
}
//#endregion
export { money as a, toFaDigits as c, isIranMobile as i, todayJalali as l, fromFaDigits as n, nowTime as o, isIranLegalId as r, parseAmount as s, cn as t, uid as u };
