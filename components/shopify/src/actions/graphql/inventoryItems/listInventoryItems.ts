import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listInventoryItemsExamplePayload as examplePayload } from "../../../examplePayloads";
import { listInventoryItemsInputs as inputs } from "../../../inputsGql";
import { fetchData } from "../../../util";
import type { PageInfo } from "../../interfaces/PageInfo";
import listInventoryItemsQuery from "../queries/inventoryItems/ListInventoryItems.gql";

export const listInventoryItemsGql = action({
  display: {
    label: "List Inventory Items",
    description: "Lists all inventory items.",
  },
  perform: async (context, { shopifyConnection, query, getAlldata, limit, endCursor }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data = (await fetchData(
      client,
      ["inventoryItems"],
      "inventoryItems",
      getAlldata,
      listInventoryItemsQuery,
      {
        first: getAlldata ? MAX_LIMIT : limit,
        cursor: getAlldata ? undefined : endCursor,
        query,
      },
    )) as Record<"inventoryItems", unknown[]> & { pageInfo: PageInfo };

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
