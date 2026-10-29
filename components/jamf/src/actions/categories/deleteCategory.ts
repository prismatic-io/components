import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteCategoryExamplePayload } from "../../examplePayloads";
import { deleteCategoryInputs } from "../../inputs";

export const deleteCategory = action({
  display: {
    label: "Delete Category",
    description: "Delete a category by ID.",
  },
  inputs: deleteCategoryInputs,
  perform: async (context, { connection, resourceId }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.delete(`/v1/categories/${resourceId}`);
    return { data: `Successfully deleted category ${resourceId}` };
  },
  examplePayload: deleteCategoryExamplePayload,
});
