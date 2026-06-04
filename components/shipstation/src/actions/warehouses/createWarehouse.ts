import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { createWarehouseExamplePayload } from "../../examplePayloads";
import { createWarehouseInputs } from "../../inputs";

export const createWarehouse = action({
  display: {
    label: "Create Warehouse",
    description:
      "Creates a Ship From Location (warehouse) in the ShipStation account.",
  },
  perform: async (
    context,
    { connectionInput, warehouseName, originAddress, returnAddress, isDefault },
  ) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const body = {
      warehouseName,
      originAddress,
      returnAddress,
      isDefault,
    };

    const { data } = await client.post("/warehouses/createwarehouse", body);
    return { data };
  },
  inputs: createWarehouseInputs,
  examplePayload: createWarehouseExamplePayload,
});
