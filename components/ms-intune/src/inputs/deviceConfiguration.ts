import { input, util } from "@prismatic-io/spectral";
import { connection } from "./common";
const deviceConfigurationId = input({
  label: "Device Configuration ID",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter device configuration ID",
  comments: "Unique Identifier for the device to retrieve.",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectDeviceConfiguration",
});
export const getDeviceConfigurationsInputs = {
  connection,
  deviceConfigurationId,
};
export const listDeviceConfigurationsInputs = {
  connection,
};
