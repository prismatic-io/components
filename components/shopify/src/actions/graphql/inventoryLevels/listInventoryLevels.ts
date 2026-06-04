import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listInventoryLevelsExamplePayload as examplePayload } from "../../../examplePayloads";
import { listInventoryLevelsInputs as inputs } from "../../../inputsGql";
import { fetchData } from "../../../util";
import type { PageInfo } from "../../interfaces/PageInfo";
import listInventoryLevelsQuery from "../queries/inventoryLevels/ListInventoryLevels.gql";

export const listInventoryLevelsGql = action({
  display: {
    label: "List Inventory Levels At Location",
    description: "Lists all inventory levels at a specified location.",
  },
  perform: async (context, { shopifyConnection, locationId, getAlldata, limit, endCursor }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data = (await fetchData(
      client,
      ["location", "inventoryLevels"],
      "inventoryLevels",
      getAlldata,
      listInventoryLevelsQuery,
      {
        id: locationId,
        first: getAlldata ? MAX_LIMIT : limit,
        cursor: getAlldata ? undefined : endCursor,
      },
    )) as Record<"inventoryLevels", unknown[]> & { pageInfo: PageInfo };

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
