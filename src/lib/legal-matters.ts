import catalog from "../data/legal-matters.json" with { type: "json" };

export type LegalMatter = {
  id: string;
  code: string;
  category: string;
  subcategory: string;
  title: string;
  action_type: string;
  nature: string;
  competent_forum: string;
  legal_basis: string;
  appealability: string;
  deadline: string;
  notes: string;
  verification_status: string;
  last_reviewed: string;
  aliases: string[];
};

export const legalMatterCatalog = catalog;
export const legalMatters = catalog.matters as LegalMatter[];

export function normalizeLegalText(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .toLocaleLowerCase("fa-IR");
}

export function searchLegalMatters(
  query: string,
  filters: { category?: string; actionType?: string } = {},
) {
  const normalizedQuery = normalizeLegalText(query.trim());
  return legalMatters.filter((matter) => {
    if (filters.category && matter.category !== filters.category) return false;
    if (filters.actionType && matter.action_type !== filters.actionType) return false;
    if (!normalizedQuery) return true;

    const searchable = normalizeLegalText([
      matter.id,
      matter.category,
      matter.subcategory,
      matter.title,
      matter.action_type,
      matter.nature,
      matter.competent_forum,
      matter.legal_basis,
      matter.appealability,
      matter.deadline,
      matter.notes,
      ...matter.aliases,
    ].join(" "));
    return normalizedQuery.split(/\s+/).every((token) => searchable.includes(token));
  });
}

export const legalMatterCategories = [...new Set(legalMatters.map((matter) => matter.category))]
  .sort((a, b) => a.localeCompare(b, "fa"));

export const legalMatterActionTypes = [...new Set(legalMatters.map((matter) => matter.action_type))]
  .sort((a, b) => a.localeCompare(b, "fa"));
