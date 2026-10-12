import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductsInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getProductsExamplePayload } from "../../examplePayloads";
import { getProductsOutputSchema } from "../../outputSchemas";
export const getProducts = action({
  display: {
    label: "Get Products",
    description: "Gets all products.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      filterId,
      ids,
      pagination: { limit, cursor } = {},
      sortBy,
      sortDirection,
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get("/products", {
      params: {
        filter_id: filterId,
        ids,
        limit,
        sort_by: sortBy,
        sort_direction: sortDirection,
        cursor,
      },
    });
    return { data };
  },
  inputs: getProductsInputs,
  examplePayload: getProductsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProductsOutputSchema,
  }),
});
