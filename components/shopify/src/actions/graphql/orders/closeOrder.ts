import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { closeOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { closeOrderInputs as inputs } from "../../../inputsGql";
import closeOrderQuery from "../queries/orders/CloseOrder.gql";

export const closeOrderGql = action({
  display: {
    label: "Close Order",
    description: "Closes an existing order.",
  },
  perform: async (context, { orderId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data: { orderClose: Record<string, unknown> } = await client.request(closeOrderQuery, {
      input: {
        id: orderId,
      },
    });
    return { data: data.orderClose };
  },
  inputs,
  examplePayload,
});
