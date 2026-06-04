import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, region, warehouseId } from "../../inputs";
import { deleteExamplePayload } from "../../examplePayloads";

export const deleteWarehouse = action({
  display: {
    label: "Delete Warehouse",
    description: "Deletes an existing Warehouse.",
  },
  inputs: {
    connectionInput,
    region,
    warehouseId,
  },
  perform: async (context, { connectionInput, region, warehouseId }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.delete(`/warehouses/${warehouseId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: deleteExamplePayload,
  },
});
