import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listInventoryLevelsExamplePayload as examplePayload } from "../../../examplePayloads";
import { listInventoryLevelsInputs as inputs } from "../../../inputsGql";
import { listInventoryLevelsGqlOutputSchema } from "../../../outputSchemas";
import type { PageInfo } from "../../../types";
import { fetchData } from "../../../util";
import listInventoryLevelsQuery from "../queries/inventoryLevels/ListInventoryLevels.gql";

export const listInventoryLevelsGql = action({
  display: {
    label: "List Inventory Levels At Location",
    description: "Lists all inventory levels at a specified location.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { shopifyConnection, locationId, getAlldata, pagination = {} },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data = (await fetchData(
      client,
      ["location", "inventoryLevels"],
      "inventoryLevels",
      getAlldata,
      listInventoryLevelsQuery,
      {
        id: locationId,
        first: getAlldata ? MAX_LIMIT : pagination.limit,
        cursor: getAlldata ? undefined : pagination.endCursor,
      },
    )) as Record<"inventoryLevels", unknown[]> & { pageInfo: PageInfo };

    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listInventoryLevelsGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
