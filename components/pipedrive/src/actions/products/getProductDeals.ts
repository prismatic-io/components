import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductDealsInputs } from "../../inputs";
import { getProductDealsExamplePayload } from "../../examplePayloads";
import { getProductDealsOutputSchema } from "../../outputSchemas";

export const getProductDeals = action({
  display: {
    label: "Get Product Deals",
    description: "Gets deals that a product is attached to.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { start, limit } = {}, status },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/products/${id}/deals`, {
      params: { start, limit, status },
    });
    return { data };
  },
  inputs: getProductDealsInputs,
  examplePayload: getProductDealsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProductDealsOutputSchema,
  }),
});
