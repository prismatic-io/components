import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteCategoryExamplePayload } from "../../examplePayloads";
import { deleteCategoryInputs } from "../../inputs";

export const deleteCategory = action({
  display: {
    label: "Delete Category",
    description: "Deletes a category.",
  },
  inputs: deleteCategoryInputs,
  perform: async (context, { connection, categoryIdRequired }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/categories/delete", {
      categoryID: categoryIdRequired,
    });
    return { data };
  },
  examplePayload: deleteCategoryExamplePayload,
});
