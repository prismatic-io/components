import { input, util } from "@prismatic-io/spectral";

export const saleShipmentId = input({
  label: "Sale Shipment ID",
  comments: "The ID of the sale shipment you want to retrieve.",
  type: "string",
  required: true,
  example: "00000000-0000-0000-0000-000000000000",
  placeholder: "00000000-0000-0000-0000-000000000000",
  dataSource: "listSalesShipment",
  clean: util.types.toString,
});
