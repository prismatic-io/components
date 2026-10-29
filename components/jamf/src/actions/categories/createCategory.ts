import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCategoryExamplePayload } from "../../examplePayloads";
import { createCategoryInputs } from "../../inputs";
import type { JamfCreateResponse } from "../../types";

export const createCategory = action({
  display: {
    label: "Create Category",
    description: "Create a new category.",
  },
  inputs: createCategoryInputs,
  perform: async (context, { connection, categoryName, priority }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post<JamfCreateResponse>("/v1/categories", {
      name: categoryName,
      priority,
    });
    return { data };
  },
  examplePayload: createCategoryExamplePayload,
});
