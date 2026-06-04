import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

const managedDeviceId = input({
  label: "Managed Device Id",
  comments: "Unique Identifier for the device to retrieve.",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter managed device ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
  dataSource: "selectManagedDevice",
});

export default { managedDeviceId };
