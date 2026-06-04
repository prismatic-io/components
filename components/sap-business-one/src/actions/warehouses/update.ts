import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { DEFAULT_UPDATE_RESPONSE } from "../../constants";
import { updateWarehouseInputs } from "../../inputs/warehouses/update";

export const updateWarehouse = action({
  display: {
    label: "Update Warehouse",
    description: "Update an instance of Warehouses.",
  },
  inputs: {
    ...updateWarehouseInputs,
    connection,
  },
  perform: async (context, { connection, bodyFields, WarehouseCode, WarehouseName, Location }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    await client.patch(`/Warehouses('${WarehouseCode}')`, {
      WarehouseName,
      Location,
      ...bodyFields,
    });

    return {
      data: DEFAULT_UPDATE_RESPONSE,
    };
  },
  examplePayload: {
    data: DEFAULT_UPDATE_RESPONSE,
  },
});
