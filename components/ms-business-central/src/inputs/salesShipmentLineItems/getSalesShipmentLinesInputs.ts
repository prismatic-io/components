import { input, util } from "@prismatic-io/spectral";

export const salesShipmentLineId = input({
  label: "Sales Shipment Line ID",
  comments: "The ID of the sales shipment line object.",
  required: true,
  type: "string",
  placeholder: "be90f4f2-1735-ef11-8409-6045bdfedf9a",
  example: "be90f4f2-1735-ef11-8409-6045bdfedf9a",
  dataSource: "selectSalesShipmentLine",
  clean: util.types.toString,
});
