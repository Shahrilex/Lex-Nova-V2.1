import { c as nextWorkingDay, i as isWeekendOrHoliday, l as parseJalali, n as formatJ, r as holidayLabel, t as addDays } from "./jalali-BQNfiI_Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deadline-engine-Cw4DJRaM.js
var deadlineRules = [
	{
		code: "REV-20",
		title: "تجدیدنظرخواهی",
		daysIran: 20,
		daysAbroad: 60,
		origin: "ابلاغ رأی",
		article: "ماده ۳۳۶ قانون آیین دادرسی مدنی",
		skipNoticeDay: true
	},
	{
		code: "APPEAL-20",
		title: "واخواهی",
		daysIran: 20,
		daysAbroad: 60,
		origin: "ابلاغ واقعی",
		article: "ماده ۳۰۶ قانون آیین دادرسی مدنی",
		skipNoticeDay: true
	},
	{
		code: "CASSATION-20",
		title: "فرجام‌خواهی",
		daysIran: 20,
		daysAbroad: 60,
		origin: "ابلاغ رأی تجدیدنظر",
		article: "ماده ۳۹۷ قانون آیین دادرسی مدنی",
		skipNoticeDay: true
	},
	{
		code: "RETRIAL-20",
		title: "اعاده دادرسی",
		daysIran: 20,
		daysAbroad: 60,
		origin: "کشف دلیل",
		article: "مواد ۴۲۷ و ۴۳۰ قانون آیین دادرسی مدنی",
		skipNoticeDay: true
	},
	{
		code: "EXPERT-OBJ-7",
		title: "اعتراض به نظریه کارشناسی",
		daysIran: 7,
		daysAbroad: null,
		origin: "ابلاغ نظریه",
		article: "ماده ۲۶۰ قانون آیین دادرسی مدنی",
		skipNoticeDay: true
	},
	{
		code: "EXPERT-EXEC-3",
		title: "اعتراض کارشناسی در اجرا",
		daysIran: 3,
		daysAbroad: null,
		origin: "ابلاغ ارزیابی",
		article: "ماده ۷۵ قانون اجرای احکام مدنی",
		skipNoticeDay: true
	},
	{
		code: "DEFECT-10",
		title: "رفع نقص دادخواست",
		daysIran: 10,
		daysAbroad: null,
		origin: "ابلاغ اخطار رفع نقص",
		article: "مواد ۵۳ و ۵۴ قانون آیین دادرسی مدنی",
		skipNoticeDay: true
	},
	{
		code: "CRIM-REV-20",
		title: "تجدیدنظر کیفری",
		daysIran: 20,
		daysAbroad: 60,
		origin: "ابلاغ رأی",
		article: "ماده ۴۳۱ قانون آیین دادرسی کیفری",
		skipNoticeDay: true
	},
	{
		code: "CRIM-ORDER-10",
		title: "اعتراض به قرار کیفری",
		daysIran: 10,
		daysAbroad: null,
		origin: "ابلاغ قرار",
		article: "قانون آیین دادرسی کیفری",
		skipNoticeDay: true
	},
	{
		code: "FAMILY-REV-20",
		title: "تجدیدنظر خانواده",
		daysIran: 20,
		daysAbroad: 60,
		origin: "ابلاغ رأی",
		article: "قانون حمایت خانواده",
		skipNoticeDay: true
	}
];
function calculateDeadline(input) {
	const rule = deadlineRules.find((r) => r.code === input.ruleCode);
	if (!rule) return {
		ok: false,
		message: "قاعده یافت نشد.",
		log: []
	};
	const start = parseJalali(input.noticeDate);
	if (!start) return {
		ok: false,
		message: "تاریخ مبدأ نامعتبر است.",
		log: [],
		rule
	};
	const days = input.abroad && rule.daysAbroad ? rule.daysAbroad : rule.daysIran;
	const log = [];
	log.push(`قاعده: ${rule.title} (${rule.article})`);
	log.push(`مبدأ (${rule.origin}): ${formatJ(start)}`);
	if (rule.skipNoticeDay) log.push("روز ابلاغ جزء مهلت نیست (ماده ۴۴۵ ق.آ.د.م). شمارش از روز بعد آغاز می‌شود.");
	log.push(`مدت قانونی: ${days} روز ${input.abroad ? "(مقیم خارج)" : "(مقیم ایران)"}`);
	const origin = rule.skipNoticeDay ? addDays(start, 1) : start;
	const raw = addDays(origin, days - 1);
	log.push(`روز پایانی محاسبه‌شده: ${formatJ(raw)}`);
	let due = raw;
	if (isWeekendOrHoliday(raw)) {
		const reason = holidayLabel(raw) || "تعطیل";
		due = nextWorkingDay(addDays(raw, 1));
		log.push(`آخرین روز ${reason} است؛ مهلت به اولین روز غیرتعطیل منتقل شد: ${formatJ(due)}`);
	} else log.push("آخرین روز تعطیل رسمی نیست.");
	log.push(`مهلت تا پایان وقت اداری ${formatJ(due)}`);
	log.push("این محاسبه جایگزین تشخیص وکیل نیست و باید با ابلاغ واقعی تطبیق داده شود.");
	return {
		ok: true,
		message: "محاسبه شد.",
		dueDate: formatJ(due),
		days,
		log,
		rule
	};
}
//#endregion
export { deadlineRules as n, calculateDeadline as t };
