import assert from "node:assert/strict";
import test from "node:test";
import { BACKUP_VERSION, isLexNovaBackup, type LexNovaBackup } from "./backup.ts";

const emptyBackup = () => ({
  version: BACKUP_VERSION,
  exportedAt: new Date().toISOString(),
  office: { name: "", lawyerName: "", address: "", phone: "", barNumber: "" },
  clients: [], cases: [], parties: [], deadlines: [], timeline: [], documents: [], notes: [],
  transactions: [], petitions: [], hearings: [], members: [], notices: [], chat: [],
});

test("accepts complete backups, including nested file attachments", () => {
  const backup = emptyBackup() as LexNovaBackup;
  backup.clients.push({ id: "c1", fullName: "Test", nationalCode: "", mobile: "", type: "individual", address: "", email: "", notes: "", createdAt: "", attachments: [{ id: "f1", name: "scan.pdf", size: 1, type: "application/pdf", dataUrl: "data:application/pdf;base64,AA==" }] });
  assert.equal(isLexNovaBackup(backup), true);
});

test("rejects incomplete collections, invalid dates, and malformed office data", () => {
  const missingCollection = emptyBackup() as Record<string, unknown>;
  delete missingCollection.cases;
  assert.equal(isLexNovaBackup(missingCollection), false);

  const invalidDate = emptyBackup();
  invalidDate.exportedAt = "not a date";
  assert.equal(isLexNovaBackup(invalidDate), false);

  const invalidOffice = emptyBackup();
  invalidOffice.office.phone = 123 as unknown as string;
  assert.equal(isLexNovaBackup(invalidOffice), false);
});
