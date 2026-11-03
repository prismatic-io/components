import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrderItemsBuyerInfoExamplePayload } from "../../examplePayloads/orders";
import { getOrderItemsBuyerInfoInputs } from "../../inputs";
import { getOrderItemsBuyerInfoOutputSchema } from "../../outputSchemas";

export const getOrderItemsBuyerInfo = action({
  display: {
    label: "Get Order Items Buyer Info",
    description:
      "Returns buyer information for the order items in the specified order.",
  },
  examplePayload: getOrderItemsBuyerInfoExamplePayload,
  inputs: getOrderItemsBuyerInfoInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrderItemsBuyerInfoOutputSchema,
  }),
  performSafety: PerformSafety.SAFE,
  perform: async (context, { connectionInput, orderId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/orders/v0/orders/${orderId}/orderItems/buyerInfo`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => getOrderItemsBuyerInfoExamplePayload,
});
