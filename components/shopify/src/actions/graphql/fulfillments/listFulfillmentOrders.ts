import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listFulfillmentOrdersExamplePayload } from "../../../examplePayloads";
import { listFulfillmentOrdersInputs as inputs } from "../../../inputsGql";
import { fetchData } from "../../../util";
import type { FulfillmentOrder } from "../../interfaces/FulfillmentOrder";
import type { PageInfo } from "../../interfaces/PageInfo";
import { fulfillmentOrderMapper } from "../mappers/fulfillmentOrderMapper";
import { paginationMapper } from "../mappers/paginationMapper";
import listFulfillmentOrdersQuery from "../queries/fulfillments/ListFulfillmentOrders.gql";

export const listFulfillmentOrdersGql = action({
  display: {
    label: "List Fulfillment Orders",
    description: "Lists all fulfillment orders for a specific order.",
  },
  inputs,
  perform: async (context, { shopifyConnection, orderId, limit, getAlldata, endCursor }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data = (await fetchData(
      client,
      ["order", "fulfillmentOrders"],
      "fulfillmentOrders",
      getAlldata,
      listFulfillmentOrdersQuery,
      {
        orderId,
        first: getAlldata ? MAX_LIMIT : limit,
        cursor: getAlldata ? undefined : endCursor,
      },
    )) as Record<"fulfillmentOrders", FulfillmentOrder[]> & {
      pageInfo: PageInfo;
    };

    return {
      data: {
        data: {
          fulfillment_orders: data.fulfillmentOrders.map(fulfillmentOrderMapper),
        },
        ...paginationMapper(data.pageInfo),
      },
    };
  },
  examplePayload: listFulfillmentOrdersExamplePayload.restMap,
});
