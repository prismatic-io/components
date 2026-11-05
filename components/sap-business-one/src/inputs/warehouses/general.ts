import { input, util } from "@prismatic-io/spectral";

export const warehouseCode = input({
  label: "Warehouse Code",
  type: "string",
  comments: "The unique code identifying the warehouse.",
  example: "WH01",
  placeholder: "Enter warehouse code",
  required: true,
  clean: util.types.toString,
});

export const warehouseName = input({
  label: "Warehouse Name",
  type: "string",
  comments: "The name of the warehouse.",
  example: "Main Distribution Center",
  placeholder: "Enter warehouse name",
  required: true,
  clean: util.types.toString,
});

export const warehouseLocationId = input({
  label: "Warehouse Location ID",
  type: "string",
  comments: "The unique identifier for the warehouse location. This is an integer value.",
  example: "1",
  placeholder: "Enter warehouse location ID",
  required: true,
  clean: util.types.toString,
});
