import { dataSource, util } from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import { selectWarehousesInputs } from "../inputs";
import type { Warehouse } from "../types";

export const selectWarehouses = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Warehouse",
    description:
      "A picklist of Ship From Locations (warehouses) in the ShipStation account.",
  },
  inputs: selectWarehousesInputs,
  perform: async (_context, { connectionInput }) => {
    const client = createShipStationClient(connectionInput);

    const { data } = await client.get("/warehouses");

    return {
      result: data.map((warehouse: Warehouse) => ({
        key: util.types.toString(warehouse.warehouseId),
        label: warehouse.warehouseName,
      })),
    };
  },
});
