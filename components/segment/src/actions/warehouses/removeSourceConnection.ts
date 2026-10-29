import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, region, sourceId, warehouseId } from "../../inputs";
import { deleteExamplePayload } from "../../examplePayloads";

export const removeSourceConnectionFromWarehouse = action({
  display: {
    label: "Remove Source Connection from Warehouse",
    description: "Disconnects a Source from a Warehouse.",
  },
  inputs: {
    connectionInput,
    region,
    warehouseId,
    sourceId,
  },
  perform: async (
    context,
    { connectionInput, region, warehouseId, sourceId },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.delete(
      `/warehouses/${warehouseId}/connected-sources/${sourceId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: deleteExamplePayload,
  },
});
