import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection, $select } from "../../../inputs/general";
import { warehouseLocationId } from "../../../inputs/warehouses/general";
import { getWarehouseLocationExamplePayload } from "../../../examplePayloads/warehouseLocations";

export const getWarehouseLocation = action({
  display: {
    label: "Get Warehouse Location",
    description:
      "Retrieve all or some selected properties from an instance of Warehouse Location with the given id.",
  },
  inputs: {
    warehouseLocationId,
    $select,
    connection,
  },
  perform: async (context, { connection, $select, warehouseLocationId }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.get(`/WarehouseLocations(${warehouseLocationId})`, {
      params: {
        $select,
      },
    });
    return {
      data,
    };
  },
  examplePayload: getWarehouseLocationExamplePayload,
});
