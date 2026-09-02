import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteCategoryExamplePayload } from "../../examplePayloads";
import { deleteCategoryInputs } from "../../inputs";
import { deleteCategoryOutputSchema } from "../../outputSchemas";
export const deleteCategory = action({
  display: {
    label: "Delete Category",
    description: "Deletes a category.",
  },
  inputs: deleteCategoryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteCategoryOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, categoryIdRequired }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/categories/delete", {
      categoryID: categoryIdRequired,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteCategoryExamplePayload,
  examplePayload: deleteCategoryExamplePayload,
});
