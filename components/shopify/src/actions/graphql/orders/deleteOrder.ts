import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { deleteOrderInputs as inputs } from "../../../inputsGql";

import deleteOrderQuery from "../queries/orders/DeleteOrder.gql";

export const deleteOrderGql = action({
  display: {
    label: "Delete Order",
    description: "Deletes an existing order by ID.",
  },
  perform: async (context, { orderId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: { orderDelete: Record<string, unknown> } = await client.request(deleteOrderQuery, {
      orderId,
    });

    return {
      data: data.orderDelete,
    };
  },
  inputs,
  examplePayload,
});
