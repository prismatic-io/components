import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, region, warehouseId } from "../../inputs";
import { getWarehouseExamplePayload } from "../../examplePayloads";

export const getWarehouse = action({
  display: {
    label: "Get Warehouse",
    description: "Returns a Warehouse by its id.",
  },
  inputs: {
    connectionInput,
    region,
    warehouseId,
  },
  perform: async (context, { connectionInput, region, warehouseId }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(`/warehouses/${warehouseId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getWarehouseExamplePayload,
  },
});
