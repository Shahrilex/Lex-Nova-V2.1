import type {
  CaseItem,
  Client,
  CounselTurn,
  DeadlineItem,
  DocumentItem,
  Hearing,
  Member,
  NoteItem,
  Notice,
  OfficeProfile,
  Party,
  PetitionDraft,
  TimelineEvent,
  Transaction,
} from "./types";

export const BACKUP_VERSION = 1;

export type LexNovaBackup = {
  version: typeof BACKUP_VERSION;
  exportedAt: string;
  office: OfficeProfile;
  clients: Client[];
  cases: CaseItem[];
  parties: Party[];
  deadlines: DeadlineItem[];
  timeline: TimelineEvent[];
  documents: DocumentItem[];
  notes: NoteItem[];
  transactions: Transaction[];
  petitions: PetitionDraft[];
  hearings: Hearing[];
  members: Member[];
  notices: Notice[];
  chat: CounselTurn[];
};

type BackupField = Exclude<keyof LexNovaBackup, "version" | "exportedAt" | "office">;

const collectionFields: BackupField[] = [
  "clients",
  "cases",
  "parties",
  "deadlines",
  "timeline",
  "documents",
  "notes",
  "transactions",
  "petitions",
  "hearings",
  "members",
  "notices",
  "chat",
];

export function isLexNovaBackup(value: unknown): value is LexNovaBackup {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  if (candidate.version !== BACKUP_VERSION || !candidate.office || typeof candidate.office !== "object") return false;
  const office = candidate.office as Record<string, unknown>;
  if (!["name", "lawyerName", "address", "phone", "barNumber"].every((key) => typeof office[key] === "string")) return false;
  if (typeof candidate.exportedAt !== "string" || !Number.isFinite(Date.parse(candidate.exportedAt))) return false;
  return collectionFields.every((field) =>
    Array.isArray(candidate[field]) && (candidate[field] as unknown[]).every((item) => item !== null && typeof item === "object" && !Array.isArray(item)),
  );
}
