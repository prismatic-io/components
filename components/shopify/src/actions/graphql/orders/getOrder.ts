import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { getOrderInputs as inputs } from "../../../inputsGql";

import getOrderQuery from "../queries/orders/GetOrder.gql";

export const getOrderGql = action({
  display: {
    label: "Get Order",
    description: "Retrieves an order by ID.",
  },
  perform: async (context, { orderId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data = await client.request(getOrderQuery, {
      id: orderId,
    });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
