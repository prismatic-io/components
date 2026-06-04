import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { updateWarehouseExamplePayload } from "../../examplePayloads";
import { updateWarehouseInputs } from "../../inputs";

export const updateWarehouse = action({
  display: {
    label: "Update Warehouse",
    description: "Updates an existing Ship From Location (warehouse).",
  },
  perform: async (context, { connectionInput, warehouseUpdateData }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { warehouseId, ...otherData } = warehouseUpdateData;

    const { data } = await client.put(`/warehouses/${warehouseId}`, otherData);
    return { data };
  },
  inputs: updateWarehouseInputs,
  examplePayload: updateWarehouseExamplePayload,
});
