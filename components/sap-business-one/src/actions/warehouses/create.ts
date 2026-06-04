import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { createWarehouseInputs } from "../../inputs/warehouses/create";

export const createWarehouse = action({
  display: {
    label: "Create Warehouse",
    description: "Create an instance of Warehouses.",
  },
  inputs: {
    ...createWarehouseInputs,
    connection,
  },
  perform: async (context, { connection, bodyFields, WarehouseCode, WarehouseName, Location }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.post(`/Warehouses`, {
      WarehouseCode,
      WarehouseName,
      Location,
      ...bodyFields,
    });
    return {
      data,
    };
  },
});
