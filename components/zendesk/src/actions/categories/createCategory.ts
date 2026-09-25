import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { createCategoryExamplePayload } from "../../examplePayloads";
import { createCategoryInputs } from "../../inputs";
import { createCategoryOutputSchema } from "../../outputSchemas";
import type { Category } from "../../types";
export const createCategory = action({
  display: {
    label: "Create Category",
    description: "Create a category in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { zendeskConnection, categoryDescription, categoryName, locale, position },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      category: {
        name: categoryName,
        locale: locale,
        position: position,
        description: categoryDescription,
      },
    };
    const { data } = await client.post<{
      category: Category;
    }>(`/help_center/${locale}/categories`, payload);
    return { data };
  },
  examplePerform: async (
    _context,
    { categoryDescription, categoryName, locale },
  ) => ({
    data: {
      ...createCategoryExamplePayload.data,
      category: {
        ...createCategoryExamplePayload.data.category,
        ...(categoryName ? { name: categoryName } : {}),
        ...(categoryDescription ? { description: categoryDescription } : {}),
        ...(locale ? { locale } : {}),
      },
    },
  }),
  inputs: createCategoryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createCategoryOutputSchema,
  }),
  examplePayload: createCategoryExamplePayload,
});
