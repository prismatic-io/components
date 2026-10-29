import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateCategoryExamplePayload } from "../../examplePayloads";
import { updateCategoryInputs } from "../../inputs";
import type { Category } from "../../types";
import { mergeDefined } from "../../util";

export const updateCategory = action({
  display: {
    label: "Update Category",
    description: "Update an existing category.",
  },
  inputs: updateCategoryInputs,
  perform: async (
    context,
    { connection, resourceId, categoryName, priority },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data: existing } = await client.get<Category>(
      `/v1/categories/${resourceId}`,
    );
    const { data } = await client.put<Category>(
      `/v1/categories/${resourceId}`,
      mergeDefined(existing, { name: categoryName, priority }),
    );
    return { data };
  },
  examplePayload: updateCategoryExamplePayload,
});
