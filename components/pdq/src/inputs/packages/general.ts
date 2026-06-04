import { input, util } from "@prismatic-io/spectral";

export const packageId = input({
  label: "Package ID",
  comments: "The ID of the package",
  type: "string",
  required: true,
  example: "123456",
  placeholder: "Enter package ID",
  clean: util.types.toString,
  dataSource: "selectPackage",
});
