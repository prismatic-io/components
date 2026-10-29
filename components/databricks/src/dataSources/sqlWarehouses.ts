import { dataSource } from "@prismatic-io/spectral";
import { createDataBricksClient } from "../client";
import { connectionInput } from "../inputs";
import type { Warehouse } from "../types";

const selectWarehouse = dataSource({
  display: {
    label: "Select SQL Warehouse",
    description: "Select a SQL Warehouse.",
  },
  inputs: { connection: connectionInput },
  dataSourceType: "picklist",
  perform: async (_context, params) => {
    const client = createDataBricksClient(params.connection, "2.0", false);
    const response = await client.get<{ warehouses: Warehouse[] }>(
      "sql/warehouses",
    );
    if (!response.data.warehouses) {
      throw new Error("No Databricks SQL Warehouses found in workspace");
    }
    return {
      result: response.data.warehouses.map((warehouse) => ({
        key: warehouse.id,
        label: warehouse.name,
      })),
    };
  },
});

export default { selectWarehouse };
