import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrderExamplePayload } from "../../examplePayloads/orders";
import { getOrderInputs } from "../../inputs";
import { getOrderOutputSchema } from "../../outputSchemas";

export const getOrder = action({
  display: {
    label: "Get Order",
    description: "Returns the specified order.",
  },
  examplePayload: getOrderExamplePayload,
  inputs: getOrderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrderOutputSchema,
  }),
  performSafety: PerformSafety.SAFE,
  perform: async (context, { connectionInput, orderId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/orders/v0/orders/${orderId}`);
    return {
      data,
    };
  },
  examplePerform: async () => getOrderExamplePayload,
});
