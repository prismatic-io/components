import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { DEFAULT_DELETE_RESPONSE } from "../../constants";
import { warehouseCode } from "../../inputs/warehouses/general";

export const deleteWarehouse = action({
  display: {
    label: "Delete Warehouse",
    description: "Delete an instance of Warehouses with the specified id.",
  },
  inputs: {
    warehouseCode,
    connection,
  },
  perform: async (context, { connection, warehouseCode }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    await client.delete(`/Warehouses('${warehouseCode}')`);
    return {
      data: DEFAULT_DELETE_RESPONSE,
    };
  },
  examplePayload: {
    data: DEFAULT_DELETE_RESPONSE,
  },
});
