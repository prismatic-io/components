import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { deleteWarehouseExamplePayload } from "../../examplePayloads";
import { deleteWarehouseInputs } from "../../inputs";

export const deleteWarehouse = action({
  display: {
    label: "Delete Warehouse",
    description:
      "Deletes a warehouse (Ship From Location) by setting it to inactive status.",
  },
  perform: async (context, { connectionInput, warehouseId }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.delete(`/warehouses/${warehouseId}`);
    return { data };
  },
  inputs: deleteWarehouseInputs,
  examplePayload: deleteWarehouseExamplePayload,
});
