import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, region, sourceId, warehouseId } from "../../inputs";
import { addConnectionFromSourceExamplePayload } from "../../examplePayloads";

export const addConnectionFromSourceToWarehouse = action({
  display: {
    label: "Add Connection From Source to Warehouse",
    description: "Connects a Source to a Warehouse.",
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
    const { data } = await client.post(
      `/warehouses/${warehouseId}/connected-sources/${sourceId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: addConnectionFromSourceExamplePayload,
  },
});
