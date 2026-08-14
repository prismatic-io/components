import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CATEGORIES_PATH } from "../../constants";
import { createCategoryExamplePayload } from "../../examplePayloads/categories";
import { createCategoryInputs } from "../../inputs/categories";
import { categoryOutputSchema } from "../../outputSchemas";
export const createCategory = action({
  examplePayload: createCategoryExamplePayload,
  display: {
    label: "Create Category",
    description: "Create a new Content Builder category (folder).",
  },
  inputs: createCategoryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: categoryOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, categoryName, parentCategoryId }) => {
    const client = createClient(connection, context.debug.enabled);
    const body = {
      name: categoryName,
      parentId: parentCategoryId,
    };
    const { data } = await client.post(CATEGORIES_PATH, body);
    return { data };
  },
  examplePerform: async (
    _context,
    { categoryName, parentCategoryId },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createCategoryExamplePayload.data,
      name: categoryName,
      parentId: parentCategoryId,
    },
  }),
});
