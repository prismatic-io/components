import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CATEGORIES_PATH } from "../../constants";
import { deleteCategoryExamplePayload } from "../../examplePayloads/categories";
import { deleteCategoryInputs } from "../../inputs/categories";

export const deleteCategory = action({
  examplePayload: deleteCategoryExamplePayload,
  display: {
    label: "Delete Category",
    description: "Delete a Content Builder category (folder) by ID.",
  },
  inputs: deleteCategoryInputs,
  perform: async (context, { connection, categoryId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.delete(`${CATEGORIES_PATH}/${categoryId}`);

    return { data };
  },
});
