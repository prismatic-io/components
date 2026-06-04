import { action } from "@prismatic-io/spectral";
import { createDataBricksClient } from "../client";
import {
  getWarehouseExamplePayload,
  listWarehousesExamplePayload,
  startWarehouseExamplePayload,
  stopWarehouseExamplePayload,
} from "../examplePayloads";
import { connectionInput, warehouseIdInput } from "../inputs";
import type { Warehouse } from "../types";

const listWarehouses = action({
  display: {
    label: "List SQL Warehouses",
    description: "List all SQL Warehouses in the Databricks workspace",
  },
  inputs: { connection: connectionInput },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "2.0",
      context.debug.enabled,
    );
    const response = await client.get<{ warehouses: Warehouse[] }>(
      "sql/warehouses",
    );
    return { data: response.data.warehouses || [] };
  },
  examplePayload: listWarehousesExamplePayload,
});

const getWarehouse = action({
  display: {
    label: "Get SQL Warehouse",
    description: "Get a SQL Warehouse by ID.",
  },
  inputs: {
    connection: connectionInput,
    warehouseId: warehouseIdInput,
  },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "2.0",
      context.debug.enabled,
    );
    const response = await client.get<Warehouse>(
      `sql/warehouses/${params.warehouseId}`,
    );
    return { data: response.data };
  },
  examplePayload: getWarehouseExamplePayload,
});

const startWarehouse = action({
  display: {
    label: "Start SQL Warehouse",
    description: "Start a SQL Warehouse.",
  },
  inputs: {
    connection: connectionInput,
    warehouseId: warehouseIdInput,
  },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "2.0",
      context.debug.enabled,
    );
    await client.post(`sql/warehouses/${params.warehouseId}/start`);
    return { data: "Warehouse started" };
  },
  examplePayload: startWarehouseExamplePayload,
});

const stopWarehouse = action({
  display: {
    label: "Stop SQL Warehouse",
    description: "Stop a SQL Warehouse.",
  },
  inputs: {
    connection: connectionInput,
    warehouseId: warehouseIdInput,
  },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "2.0",
      context.debug.enabled,
    );
    await client.post(`sql/warehouses/${params.warehouseId}/stop`);
    return { data: "Warehouse stopped" };
  },
  examplePayload: stopWarehouseExamplePayload,
});

export default { getWarehouse, listWarehouses, startWarehouse, stopWarehouse };
