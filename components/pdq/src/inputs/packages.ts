import { input, util } from "@prismatic-io/spectral";
import { connection, listDefaultInputs } from "./common";
const packageId = input({
  label: "Package ID",
  comments: "The unique identifier for the package to retrieve.",
  type: "string",
  required: true,
  example: "123456",
  placeholder: "Enter package ID",
  clean: util.types.toString,
  dataSource: "selectPackage",
});
export const getPackageInputs = {
  packageId,
  connection,
};
export const listPackagesInputs = {
  ...listDefaultInputs,
  connection,
};
