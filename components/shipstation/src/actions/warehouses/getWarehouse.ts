import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { getWarehouseExamplePayload } from "../../examplePayloads";
import { getWarehouseInputs } from "../../inputs";

export const getWarehouse = action({
  display: {
    label: "Get Warehouse",
    description:
      "Retrieves detailed information about a specific Ship From Location (warehouse).",
  },
  perform: async (context, { connectionInput, warehouseId }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.get(`/warehouses/${warehouseId}`);
    return { data };
  },
  inputs: getWarehouseInputs,
  examplePayload: getWarehouseExamplePayload,
});
