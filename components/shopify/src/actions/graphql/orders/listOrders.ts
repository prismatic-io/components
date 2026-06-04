import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listOrdersExamplePayload as examplePayload } from "../../../examplePayloads";
import { listOrdersInputs as inputs } from "../../../inputsGql";
import { fetchData } from "../../../util";
import type { PageInfo } from "../../interfaces/PageInfo";
import listOrdersQuery from "../queries/orders/ListOrders.gql";

export const listOrdersGql = action({
  display: {
    label: "List Orders",
    description: "Lists all orders.",
  },
  perform: async (context, { shopifyConnection, query, getAlldata, endCursor, limit }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data = (await fetchData(client, ["orders"], "orders", getAlldata, listOrdersQuery, {
      first: getAlldata ? MAX_LIMIT : limit,
      cursor: getAlldata ? undefined : endCursor,
      query,
    })) as Record<"orders", unknown[]> & { pageInfo: PageInfo };

    return {
      data,
    };
  },
  examplePayload,
  inputs,
});
