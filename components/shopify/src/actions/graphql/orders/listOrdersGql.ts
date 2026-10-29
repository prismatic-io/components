import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listOrdersExamplePayload as examplePayload } from "../../../examplePayloads";
import { listOrdersInputs as inputs } from "../../../inputsGql";
import { listOrdersGqlOutputSchema } from "../../../outputSchemas";
import type { PageInfo } from "../../../types";
import { fetchData } from "../../../util";
import listOrdersQuery from "../queries/orders/ListOrders.gql";

export const listOrdersGql = action({
  display: {
    label: "List Orders",
    description: "Lists all orders.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { shopifyConnection, query, getAlldata, pagination = {} },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data = (await fetchData(
      client,
      ["orders"],
      "orders",
      getAlldata,
      listOrdersQuery,
      {
        first: getAlldata ? MAX_LIMIT : pagination.limit,
        cursor: getAlldata ? undefined : pagination.endCursor,
        query,
      },
    )) as Record<"orders", unknown[]> & { pageInfo: PageInfo };

    return {
      data,
    };
  },
  examplePerform: async () => examplePayload,
  examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listOrdersGqlOutputSchema,
  }),
});
