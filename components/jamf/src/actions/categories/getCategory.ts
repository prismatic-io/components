import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCategoryExamplePayload } from "../../examplePayloads";
import { getCategoryInputs } from "../../inputs";
import type { Category } from "../../types";

export const getCategory = action({
  display: {
    label: "Get Category",
    description: "Get a single category by ID.",
  },
  inputs: getCategoryInputs,
  perform: async (context, { connection, resourceId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get<Category>(`/v1/categories/${resourceId}`);
    return { data };
  },
  examplePayload: getCategoryExamplePayload,
});
