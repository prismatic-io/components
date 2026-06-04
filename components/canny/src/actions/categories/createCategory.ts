import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCategoryExamplePayload } from "../../examplePayloads";
import { createCategoryInputs } from "../../inputs";

export const createCategory = action({
  display: {
    label: "Create Category",
    description: "Creates a new category in a board.",
  },
  inputs: createCategoryInputs,
  perform: async (
    context,
    {
      connection,
      boardIdRequired,
      categoryName,
      subscribeAdmins,
      parentCategoryId,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/categories/create", {
      boardID: boardIdRequired,
      name: categoryName,
      subscribeAdmins,
      parentID: parentCategoryId,
    });
    return { data };
  },
  examplePayload: createCategoryExamplePayload,
});
