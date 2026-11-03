import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrderItemsExamplePayload } from "../../examplePayloads/orders";
import { getOrderItemsInputs } from "../../inputs";
import { getOrderItemsOutputSchema } from "../../outputSchemas";

export const getOrderItems = action({
  display: {
    label: "Get Order Items",
    description:
      "Returns detailed order item information for the specified order.",
  },
  examplePayload: getOrderItemsExamplePayload,
  inputs: getOrderItemsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrderItemsOutputSchema,
  }),
  performSafety: PerformSafety.SAFE,
  perform: async (context, { connectionInput, orderId, NextToken }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/orders/v0/orders/${orderId}/orderItems`,
      {
        params: {
          NextToken: NextToken || undefined,
        },
      },
    );
    return {
      data,
    };
  },
  examplePerform: async () => getOrderItemsExamplePayload,
});
