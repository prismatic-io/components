import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { closeOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { closeOrderInputs as inputs } from "../../../inputsGql";
import { closeOrderGqlOutputSchema } from "../../../outputSchemas";
import closeOrderQuery from "../queries/orders/CloseOrder.gql";
export const closeOrderGql = action({
  display: {
    label: "Close Order",
    description: "Closes an existing order.",
  },
  performSafety: "notAllowed",
  perform: async (context, { orderId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: {
      orderClose: Record<string, unknown>;
    } = await client.request(closeOrderQuery, {
      input: {
        id: orderId,
      },
    });
    return { data: data.orderClose };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: closeOrderGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
