import { dataSource } from "@prismatic-io/spectral";
import { $filter, connection } from "../inputs/general";
import { createClient } from "../client";
import { fetchAllData, mapPicklistArray, validateArray } from "../util";
import { warehouseDataSourceExamplePayload } from "../examplePayloads/datasources";

export const selectWarehouse = dataSource({
  display: {
    label: "Select Warehouse",
    description: "Select a Warehouse from a dropdown menu.",
  },
  inputs: {
    $filter,
    connection,
  },
  perform: async (context, { connection, $filter }) => {
    const WAREHOUSE_CODE = "WarehouseCode";
    const WAREHOUSE_NAME = "WarehouseName";
    const client = await createClient(connection, context, true);

    const data = await fetchAllData(
      client,
      "Warehouses",
      {
        $select: `${WAREHOUSE_CODE},${WAREHOUSE_NAME}`,
        $filter,
      },
      true,
      1000,
    );

    const array = validateArray(data);

    const objects = mapPicklistArray({
      data: array,
      keyName: WAREHOUSE_CODE,
      keyLabel: WAREHOUSE_NAME,
      orderKey: WAREHOUSE_NAME,
    });

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: warehouseDataSourceExamplePayload,
});
