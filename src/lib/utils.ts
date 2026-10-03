import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uid() {
  return crypto.randomUUID();
}

export function fromFaDigits(value: string) {
  const fa = "۰۱۲۳۴۵۶۷۸۹";
  const ar = "٠١٢٣٤٥٦٧٨٩";
  return value.replace(/[۰-۹٠-٩]/g, (d) => {
    const i = fa.indexOf(d);
    if (i >= 0) return String(i);
    const j = ar.indexOf(d);
    return j >= 0 ? String(j) : d;
  });
}

export function toFaDigits(value: string | number) {
  const map = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(value).replace(/\d/g, (d) => map[Number(d)] ?? d);
}

export function todayJalali() {
  try {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  } catch {
    return "۱۴۰۵/۰۷/۱۲";
  }
}

export function nowTime() {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
  } catch {
    return "۱۲:۰۰";
  }
}

export function isIranMobile(value: string) {
  return /^09\d{9}$/.test(fromFaDigits(value).replace(/\D/g, ""));
}

export function parseAmount(value: string) {
  const n = Number(fromFaDigits(value).replace(/[,\s_]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function isIranNationalCode(value: string) {
  const d = fromFaDigits(value).replace(/\D/g, "");
  if (!/^\d{10}$/.test(d) || /^(\d)\1{9}$/.test(d)) return false;
  const digits = d.split("").map(Number);
  const sum = digits.slice(0, 9).reduce((a, n, i) => a + n * (10 - i), 0);
  const r = sum % 11;
  return digits[9] === (r < 2 ? r : 11 - r);
}

export function isIranLegalId(value: string, type: "individual" | "company") {
  const d = fromFaDigits(value).replace(/\D/g, "");
  if (type === "company") return /^\d{11}$/.test(d);
  return isIranNationalCode(d);
}

export function money(n: number) {
  return `${toFaDigits(Math.round(n).toLocaleString("en-US"))} ریال`;
}
