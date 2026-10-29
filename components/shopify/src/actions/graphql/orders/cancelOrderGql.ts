import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { cancelOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { cancelOrderInputs as inputs } from "../../../inputsGql";
import { cancelOrderGqlOutputSchema } from "../../../outputSchemas";
import cancelOrderQuery from "../queries/orders/CancelOrder.gql";

export const cancelOrderGql = action({
  display: {
    label: "Cancel Order",
    description: "Cancels an existing order.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      shopifyConnection,
      orderId,
      reason,
      refund,
      restock,
      notifyCustomer,
      staffNote,
    },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data: { orderCancel: Record<string, unknown> } = await client.request(
      cancelOrderQuery,
      {
        notifyCustomer,
        orderId,
        reason,
        refund,
        restock,
        staffNote,
      },
    );

    return { data: data.orderCancel };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: cancelOrderGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
