import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CATEGORIES_PATH } from "../../constants";
import { createCategoryExamplePayload } from "../../examplePayloads/categories";
import { createCategoryInputs } from "../../inputs/categories";

export const createCategory = action({
  examplePayload: createCategoryExamplePayload,
  display: {
    label: "Create Category",
    description: "Create a new Content Builder category (folder).",
  },
  inputs: createCategoryInputs,
  perform: async (context, { connection, categoryName, parentCategoryId }) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      name: categoryName,
      parentId: parentCategoryId,
    };

    const { data } = await client.post(CATEGORIES_PATH, body);

    return { data };
  },
});
