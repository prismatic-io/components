import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CATEGORIES_PATH } from "../../constants";
import { updateCategoryExamplePayload } from "../../examplePayloads/categories";
import { updateCategoryInputs } from "../../inputs/categories";

export const updateCategory = action({
  examplePayload: updateCategoryExamplePayload,
  display: {
    label: "Update Category",
    description:
      "Update a Content Builder category (folder) by ID. Provide only the fields you want to change.",
  },
  inputs: updateCategoryInputs,
  perform: async (
    context,
    { connection, categoryId, categoryName, parentCategoryId },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body: Record<string, unknown> = {};
    if (categoryName) body.name = categoryName;
    if (parentCategoryId) body.parentId = parentCategoryId;

    const { data } = await client.put(`${CATEGORIES_PATH}/${categoryId}`, body);

    return { data };
  },
});
