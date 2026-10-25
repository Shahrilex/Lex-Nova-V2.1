import assert from "node:assert/strict";
import test from "node:test";
import { legalMatterCategories, legalMatters, searchLegalMatters } from "./legal-matters.ts";

test("loads the complete supplied catalog with stable unique ids", () => {
  assert.equal(legalMatters.length, 306);
  assert.equal(legalMatterCategories.length, 15);
  assert.equal(new Set(legalMatters.map((matter) => matter.id)).size, 306);
});

test("searches titles and filters by category and filing type", () => {
  const results = searchLegalMatters("ایفای تعهد");
  assert.ok(results.some((matter) => matter.id === "LN-0001"));

  const filtered = searchLegalMatters("", { category: "حقوقی و مدنی", actionType: "دادخواست" });
  assert.ok(filtered.length > 0);
  assert.ok(filtered.every((matter) => matter.category === "حقوقی و مدنی" && matter.action_type === "دادخواست"));
});

test("normalizes Arabic yeh and kaf in Persian searches", () => {
  const results = searchLegalMatters("الزام به تنظيم سند رسمى");
  assert.ok(results.some((matter) => matter.title.includes("تنظیم سند رسمی")));
});
