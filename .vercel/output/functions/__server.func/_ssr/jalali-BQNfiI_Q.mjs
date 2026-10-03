import { c as toFaDigits, n as fromFaDigits } from "./utils-C78POfLB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jalali-BQNfiI_Q.js
var jalaliMonths = [
	"فروردین",
	"اردیبهشت",
	"خرداد",
	"تیر",
	"مرداد",
	"شهریور",
	"مهر",
	"آبان",
	"آذر",
	"دی",
	"بهمن",
	"اسفند"
];
var weekDays = [
	"ش",
	"ی",
	"د",
	"س",
	"چ",
	"پ",
	"ج"
];
function parseJalali(s) {
	const m = fromFaDigits(s).replace(/-/g, "/").trim().match(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
	if (!m) return null;
	return {
		y: Number(m[1]),
		m: Number(m[2]),
		d: Number(m[3])
	};
}
function formatJalali(y, m, d) {
	return toFaDigits(`${y}/${String(m).padStart(2, "0")}/${String(d).padStart(2, "0")}`);
}
function formatJ(j) {
	return formatJalali(j.y, j.m, j.d);
}
function jalaliToGregorian(jy, jm, jd) {
	jy += 1595;
	let days = -355668 + 365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4) + jd + (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
	let gy = 400 * Math.floor(days / 146097);
	days %= 146097;
	if (days > 36524) {
		gy += 100 * Math.floor(--days / 36524);
		days %= 36524;
		if (days >= 365) days++;
	}
	gy += 4 * Math.floor(days / 1461);
	days %= 1461;
	if (days > 365) {
		gy += Math.floor((days - 1) / 365);
		days = (days - 1) % 365;
	}
	let gd = days + 1;
	const sal = [
		0,
		31,
		gy % 4 === 0 && gy % 100 !== 0 || gy % 400 === 0 ? 29 : 28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
	let gm = 1;
	while (gm <= 12 && gd > sal[gm]) {
		gd -= sal[gm];
		gm++;
	}
	return [
		gy,
		gm,
		gd
	];
}
function gregorianToJalali(gy, gm, gd) {
	const gdm = [
		0,
		31,
		59,
		90,
		120,
		151,
		181,
		212,
		243,
		273,
		304,
		334
	];
	const gy2 = gm > 2 ? gy + 1 : gy;
	let days = 355666 + 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + gdm[gm - 1];
	let jy = -1595 + 33 * Math.floor(days / 12053);
	days %= 12053;
	jy += 4 * Math.floor(days / 1461);
	days %= 1461;
	if (days > 365) {
		jy += Math.floor((days - 1) / 365);
		days = (days - 1) % 365;
	}
	const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
	const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
	return {
		y: jy,
		m: jm,
		d: jd
	};
}
function todayJ() {
	const n = /* @__PURE__ */ new Date();
	return gregorianToJalali(n.getFullYear(), n.getMonth() + 1, n.getDate());
}
function daysInJalaliMonth(y, m) {
	if (m <= 6) return 31;
	if (m <= 11) return 30;
	const [gy] = jalaliToGregorian(y, 12, 30);
	const leapCheck = gregorianToJalali(gy, 3, 21);
	return leapCheck.d === 21 && leapCheck.m === 1 ? 30 : 29;
}
function weekdaySat0(j) {
	const [gy, gm, gd] = jalaliToGregorian(j.y, j.m, j.d);
	return (new Date(gy, gm - 1, gd).getDay() + 1) % 7;
}
function addDays(j, n) {
	const [gy, gm, gd] = jalaliToGregorian(j.y, j.m, j.d);
	const dt = new Date(gy, gm - 1, gd);
	dt.setDate(dt.getDate() + n);
	return gregorianToJalali(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
}
function jKey(j) {
	return `${j.y}-${j.m}-${j.d}`;
}
var FIXED_HOLIDAYS = /* @__PURE__ */ new Set([
	"1-1",
	"1-2",
	"1-3",
	"1-4",
	"1-12",
	"1-13",
	"3-14",
	"3-15",
	"11-22",
	"12-29"
]);
function isWeekendOrHoliday(j) {
	if (weekdaySat0(j) === 6) return true;
	return FIXED_HOLIDAYS.has(`${j.m}-${j.d}`);
}
function holidayLabel(j) {
	if (weekdaySat0(j) === 6) return "جمعه";
	return {
		"1-1": "عید نوروز",
		"1-2": "عید نوروز",
		"1-3": "عید نوروز",
		"1-4": "عید نوروز",
		"1-12": "روز جمهوری اسلامی",
		"1-13": "سیزده‌به‌در",
		"3-14": "رحلت امام خمینی",
		"3-15": "قیام ۱۵ خرداد",
		"11-22": "پیروزی انقلاب",
		"12-29": "ملی شدن نفت"
	}[`${j.m}-${j.d}`] ?? "";
}
function nextWorkingDay(j) {
	let cur = j;
	let guard = 0;
	while (isWeekendOrHoliday(cur) && guard < 14) {
		cur = addDays(cur, 1);
		guard++;
	}
	return cur;
}
function monthGrid(y, m) {
	const offset = weekdaySat0({
		y,
		m,
		d: 1
	});
	const dim = daysInJalaliMonth(y, m);
	const cells = [];
	for (let i = 0; i < offset; i++) cells.push(null);
	for (let d = 1; d <= dim; d++) cells.push({
		y,
		m,
		d
	});
	while (cells.length % 7 !== 0) cells.push(null);
	return cells;
}
function shiftMonth(y, m, delta) {
	let mm = m + delta;
	let yy = y;
	while (mm < 1) {
		mm += 12;
		yy -= 1;
	}
	while (mm > 12) {
		mm -= 12;
		yy += 1;
	}
	return {
		y: yy,
		m: mm
	};
}
//#endregion
export { jKey as a, nextWorkingDay as c, todayJ as d, weekDays as f, isWeekendOrHoliday as i, parseJalali as l, formatJ as n, jalaliMonths as o, holidayLabel as r, monthGrid as s, addDays as t, shiftMonth as u };
