import { dataSource, type Element, util } from "@prismatic-io/spectral";
import listInventoryItemsDataSourceQuery from "../actions/graphql/queries/inventoryItems/ListInventoryItemsDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectInventoryItemsInputs } from "../inputs";
import { fetchData, getNumericId } from "../util";

interface InventoryItemNode {
  id: string;
  sku: string | null;
}

export const selectInventoryItems = dataSource({
  display: {
    label: "Select Inventory Item",
    description: "A picklist of inventory items in your Shopify store.",
  },
  inputs: selectInventoryItemsInputs,
  perform: async (_context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, false);

    const { inventoryItems } = (await fetchData<InventoryItemNode>(
      client,
      ["inventoryItems"],
      "inventoryItems",
      true,
      listInventoryItemsDataSourceQuery,
      {
        first: MAX_LIMIT,
      },
    )) as unknown as Record<"inventoryItems", InventoryItemNode[]>;

    const result = inventoryItems
      .map<Element>((item) => {
        const numericId = getNumericId(item.id);
        return {
          label: item.sku || `Item ${numericId}`,
          key: util.types.toString(numericId),
        };
      })
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "SKU-12345", key: "39072856" }],
  },
});
