import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrderBuyerInfoExamplePayload } from "../../examplePayloads/orders";
import { getOrderBuyerInfoInputs } from "../../inputs";
import { getOrderBuyerInfoOutputSchema } from "../../outputSchemas";

export const getOrderBuyerInfo = action({
  display: {
    label: "Get Order Buyer Info",
    description: "Returns buyer information for the specified order.",
  },
  examplePayload: getOrderBuyerInfoExamplePayload,
  inputs: getOrderBuyerInfoInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrderBuyerInfoOutputSchema,
  }),
  performSafety: PerformSafety.SAFE,
  perform: async (context, { connectionInput, orderId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/orders/v0/orders/${orderId}/buyerInfo`);
    return {
      data,
    };
  },
  examplePerform: async () => getOrderBuyerInfoExamplePayload,
});
