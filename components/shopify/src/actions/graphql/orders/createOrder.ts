import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { createOrderInputs as inputs } from "../../../inputsGql";
import createOrderQuery from "../queries/orders/CreateOrder.gql";

export const createOrderGql = action({
  display: {
    label: "Create Order",
    description: "Creates a new order.",
  },
  perform: async (context, { shopifyConnection, orderData }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: { orderCreate: Record<string, unknown> } = await client.request(createOrderQuery, {
      order: orderData,
    });
    return { data: data.orderCreate };
  },
  examplePayload,
  inputs,
});
