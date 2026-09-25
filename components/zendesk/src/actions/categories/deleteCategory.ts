import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { deleteCategoryExamplePayload } from "../../examplePayloads";
import { deleteCategoryInputs } from "../../inputs";
import { deleteCategoryOutputSchema } from "../../outputSchemas";
export const deleteCategory = action({
  display: {
    label: "Delete Category",
    description: "Delete a category in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (context, { categoryId, zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.delete(
      `/help_center/categories/${categoryId}`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => deleteCategoryExamplePayload,
  inputs: deleteCategoryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteCategoryOutputSchema,
  }),
  examplePayload: deleteCategoryExamplePayload,
});
