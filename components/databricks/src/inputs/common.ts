import { input, util } from "@prismatic-io/spectral";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Databricks connection to use.",
});

export const clusterIdInput = input({
  label: "Cluster ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the Databricks cluster.",
  example: "1234-567890-reef123",
  placeholder: "Enter cluster ID",
  clean: util.types.toString,
});

export const warehouseIdInput = input({
  label: "Warehouse ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the Databricks SQL warehouse.",
  clean: util.types.toString,
  example: "0000000000000000",
  placeholder: "Enter warehouse ID",
});
