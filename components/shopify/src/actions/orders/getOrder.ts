import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { getOrderPayload } from "../../examplePayloads";
import { getOrderInputs } from "../../inputs";
import { getOrderOutputSchema } from "../../outputSchemas";

export const getOrder = action({
  display: {
    label: "Get Order (Deprecated)",
    description:
      "Retrieves the information and metadata about an order. This version of the action is being deprecated. Please replace action with Get Order.",
  },
  performSafety: "safe",
  perform: async (context, { orderId, shopifyConnection }) => {
    const client = getShopifyClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const { data } = await client.get(`/orders/${orderId}`);
    return {
      data,
    };
  },
  inputs: getOrderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrderOutputSchema,
  }),
  examplePayload: getOrderPayload,
});
