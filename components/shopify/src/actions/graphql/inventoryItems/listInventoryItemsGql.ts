import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listInventoryItemsExamplePayload as examplePayload } from "../../../examplePayloads";
import { listInventoryItemsInputs as inputs } from "../../../inputsGql";
import { listInventoryItemsGqlOutputSchema } from "../../../outputSchemas";
import type { PageInfo } from "../../../types";
import { fetchData } from "../../../util";
import listInventoryItemsQuery from "../queries/inventoryItems/ListInventoryItems.gql";
export const listInventoryItemsGql = action({
  display: {
    label: "List Inventory Items",
    description: "Lists all inventory items.",
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
      ["inventoryItems"],
      "inventoryItems",
      getAlldata,
      listInventoryItemsQuery,
      {
        first: getAlldata ? MAX_LIMIT : pagination.limit,
        cursor: getAlldata ? undefined : pagination.endCursor,
        query,
      },
    )) as Record<"inventoryItems", unknown[]> & {
      pageInfo: PageInfo;
    };
    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listInventoryItemsGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
