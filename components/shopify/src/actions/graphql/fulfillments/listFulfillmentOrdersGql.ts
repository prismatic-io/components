import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listFulfillmentOrdersExamplePayload } from "../../../examplePayloads";
import { listFulfillmentOrdersInputs as inputs } from "../../../inputsGql";
import { listFulfillmentOrdersGqlOutputSchema } from "../../../outputSchemas";
import type { FulfillmentOrder, PageInfo } from "../../../types";
import { fetchData, fulfillmentOrderMapper, paginationMapper } from "../../../util";
import listFulfillmentOrdersQuery from "../queries/fulfillments/ListFulfillmentOrders.gql";

export const listFulfillmentOrdersGql = action({
  display: {
    label: "List Fulfillment Orders",
    description: "Lists all fulfillment orders for a specific order.",
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFulfillmentOrdersGqlOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { shopifyConnection, orderId, getAlldata, pagination = {} }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data = (await fetchData(
      client,
      ["order", "fulfillmentOrders"],
      "fulfillmentOrders",
      getAlldata,
      listFulfillmentOrdersQuery,
      {
        orderId,
        first: getAlldata ? MAX_LIMIT : pagination.limit,
        cursor: getAlldata ? undefined : pagination.endCursor,
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
  examplePerform: async () => listFulfillmentOrdersExamplePayload.restMap,
  examplePayload: listFulfillmentOrdersExamplePayload.restMap,
});
