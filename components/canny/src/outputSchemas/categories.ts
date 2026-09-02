import { categorySchema, idOnlySchema, successStringSchema } from "./shared";
export const listCategoriesOutputSchema = {
  type: "object" as const,
  properties: {
    categories: { type: "array", items: categorySchema },
    hasMore: { type: "boolean" },
  },
  required: ["categories", "hasMore"],
  additionalProperties: true,
};
export const retrieveCategoryOutputSchema = categorySchema;
export const createCategoryOutputSchema = idOnlySchema;
export const deleteCategoryOutputSchema = successStringSchema;
