import { input, util } from "@prismatic-io/spectral";

export const shipmentCode = input({
  label: "Shipment Code",
  type: "string",
  required: true,
  comments: "The unique code for the shipment method.",
  example: "UPS-GND",
  placeholder: "Enter shipment code",
  clean: util.types.toString,
});

export const shipmentMethodName = input({
  label: "Shipment Method Name",
  type: "string",
  required: true,
  comments: "The display name for the shipment method.",
  example: "UPS Ground",
  placeholder: "Enter shipment method name",
  clean: util.types.toString,
});
