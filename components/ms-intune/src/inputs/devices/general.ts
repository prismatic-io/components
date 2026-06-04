import { input, util } from "@prismatic-io/spectral";

export const managedDeviceId = input({
  label: "Managed Device Id",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter managed device ID",
  comments: "Unique identifier for the managed device (UUID format).",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectManagedDevice",
});
