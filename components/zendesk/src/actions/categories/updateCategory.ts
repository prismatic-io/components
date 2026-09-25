import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { updateCategoryExamplePayload } from "../../examplePayloads";
import { updateCategoryInputs } from "../../inputs";
import { updateCategoryOutputSchema } from "../../outputSchemas";
import type { Category } from "../../types";
export const updateCategory = action({
  display: {
    label: "Update Category",
    description: "Update a category in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      categoryDescription,
      categoryName,
      locale,
      position,
      categoryId,
      zendeskConnection,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      category: {
        name: categoryName,
        description: categoryDescription,
        locale: locale,
        position: position,
      },
    };
    const { data } = await client.put<{
      category: Category;
    }>(`/help_center/categories/${categoryId}`, payload);
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { categoryDescription, categoryId, categoryName, locale },
  ) => ({
    data: {
      ...updateCategoryExamplePayload.data,
      category: {
        ...updateCategoryExamplePayload.data.category,
        ...(categoryId ? { id: categoryId } : {}),
        ...(categoryName ? { name: categoryName } : {}),
        ...(categoryDescription ? { description: categoryDescription } : {}),
        ...(locale ? { locale } : {}),
      },
    },
  }),
  inputs: updateCategoryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateCategoryOutputSchema,
  }),
  examplePayload: updateCategoryExamplePayload,
});
