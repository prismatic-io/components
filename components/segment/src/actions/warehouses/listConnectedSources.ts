import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, region, warehouseId } from "../../inputs";
import { listSourcesExamplePayload } from "../../examplePayloads";

export const listConnectedSourcesFromWarehouse = action({
  display: {
    label: "List Connected Sources from Warehouse",
    description:
      "Returns the list of Sources that are connected to a Warehouse.",
  },
  inputs: {
    connectionInput,
    region,
    warehouseId,
  },
  perform: async (context, { connectionInput, region, warehouseId }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(
      `/warehouses/${warehouseId}/connected-sources`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listSourcesExamplePayload,
  },
});
