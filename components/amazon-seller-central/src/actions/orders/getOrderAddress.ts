import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrderAddressExamplePayload } from "../../examplePayloads/orders";
import { getOrderAddressInputs } from "../../inputs";
import { getOrderAddressOutputSchema } from "../../outputSchemas";

export const getOrderAddress = action({
  display: {
    label: "Get Order Address",
    description: "Returns the shipping address for the specified order.",
  },
  examplePayload: getOrderAddressExamplePayload,
  inputs: getOrderAddressInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrderAddressOutputSchema,
  }),
  performSafety: PerformSafety.SAFE,
  perform: async (context, { connectionInput, orderId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/orders/v0/orders/${orderId}/address`);
    return {
      data,
    };
  },
  examplePerform: async () => getOrderAddressExamplePayload,
});
