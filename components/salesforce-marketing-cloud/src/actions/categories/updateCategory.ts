import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CATEGORIES_PATH } from "../../constants";
import { updateCategoryExamplePayload } from "../../examplePayloads/categories";
import { updateCategoryInputs } from "../../inputs/categories";
import { categoryOutputSchema } from "../../outputSchemas";
export const updateCategory = action({
  examplePayload: updateCategoryExamplePayload,
  display: {
    label: "Update Category",
    description:
      "Update a Content Builder category (folder) by ID. Provide only the fields to change.",
  },
  inputs: updateCategoryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: categoryOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async (
    _context,
    { categoryId, categoryName, parentCategoryId },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updateCategoryExamplePayload.data,
      id: categoryId,
      name: categoryName ?? updateCategoryExamplePayload.data.name,
      parentId: parentCategoryId ?? updateCategoryExamplePayload.data.parentId,
    },
  }),
});
