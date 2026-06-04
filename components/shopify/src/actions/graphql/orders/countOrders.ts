import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countOrdersExamplePayload as examplePayload } from "../../../examplePayloads";
import { countOrdersInputs as inputs } from "../../../inputsGql";
import type { Count } from "../../interfaces/Count";
import countOrdersQuery from "../queries/orders/CountOrders.gql";

export const countOrdersGql = action({
  display: {
    label: "Count Orders",
    description: "Returns a count of all orders.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data: { ordersCount: Count } = await client.request(countOrdersQuery);
    return { data: data.ordersCount };
  },
  inputs,
  examplePayload,
});
