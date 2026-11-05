import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, $select } from "../../inputs/general";
import { warehouseCode } from "../../inputs/warehouses/general";
import { getWarehousesExamplePayload } from "../../examplePayloads/warehouses";

export const getWarehouse = action({
  display: {
    label: "Get Warehouse",
    description:
      "Retrieve all or some selected properties from an instance of Warehouses with the given id.",
  },
  inputs: {
    warehouseCode,
    $select,
    connection,
  },
  perform: async (context, { connection, $select, warehouseCode }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.get(`/Warehouses('${warehouseCode}')`, {
      params: {
        $select,
      },
    });
    return {
      data,
    };
  },
  examplePayload: getWarehousesExamplePayload,
});
