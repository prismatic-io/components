import { input, util } from "@prismatic-io/spectral";

export const deviceId = input({
  label: "Device ID",
  type: "string",
  required: true,
  example: "123456",
  placeholder: "Enter device ID",
  comments: "The ID of the device to retrieve.",
  clean: util.types.toString,
  dataSource: "selectDevice",
});
