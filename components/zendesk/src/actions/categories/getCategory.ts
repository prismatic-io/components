import { action, outputSchema } from "@prismatic-io/spectral";
import { getCategoryInputs } from "../../inputs";
import { rawHttpClient } from "../../auth";
import { getCategoryOutputSchema } from "../../outputSchemas";
import type { Category } from "../../types";
import { getCategoryExamplePayload } from "../../examplePayloads";
export const getCategory = action({
  display: {
    label: "Get Category",
    description: "Get a category from the Help Center.",
  },
  performSafety: "safe",
  perform: async (context, { zendeskConnection, categoryId, locale }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<{
      category: Category;
    }>(`/help_center/${locale}/categories/${categoryId}`);
    return { data };
  },
  inputs: getCategoryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCategoryOutputSchema,
  }),
  examplePayload: getCategoryExamplePayload,
});
