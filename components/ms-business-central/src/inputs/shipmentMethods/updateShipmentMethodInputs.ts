import { input, util } from "@prismatic-io/spectral";

export const shipmentMethodId = input({
  label: "Shipment Method ID",
  comments: "The ID of the shipment method to update.",
  type: "string",
  required: true,
  clean: util.types.toString,
  example: "be90f4f2-1735-ef11-8409-6045bdfedf9a",
  placeholder: "Enter shipment method ID",
});
