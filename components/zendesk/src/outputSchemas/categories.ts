import {
  cursorLinksSchema,
  cursorMetaSchema,
  offsetPaginationProperties,
} from "./pagination";
export const categorySchema = {
  type: "object" as const,
  properties: {
    created_at: { type: "string", format: "date-time" },
    description: { type: "string" },
    html_url: { type: "string" },
    id: { type: "integer" },
    locale: { type: "string" },
    name: { type: "string" },
    outdated: { type: "boolean" },
    position: { type: "integer" },
    source_locale: { type: "string" },
    updated_at: { type: "string", format: "date-time" },
    url: { type: "string" },
  },
  required: ["id", "locale", "name"],
};
export const createCategoryOutputSchema = {
  type: "object" as const,
  properties: { category: categorySchema },
  required: ["category"],
};
export const deleteCategoryOutputSchema = { type: "string" as const };
export const getCategoryOutputSchema = {
  type: "object" as const,
  properties: { category: categorySchema },
  required: ["category"],
};
export const listCategoriesOutputSchema = {
  type: "object" as const,
  properties: {
    categories: { type: "array", items: categorySchema },
    meta: cursorMetaSchema,
    links: cursorLinksSchema,
    ...offsetPaginationProperties,
  },
  required: ["categories"],
};
export const updateCategoryOutputSchema = {
  type: "object" as const,
  properties: { category: categorySchema },
  required: ["category"],
};
