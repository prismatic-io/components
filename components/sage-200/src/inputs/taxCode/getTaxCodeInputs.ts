import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

export const taxCodeId = input({
  label: "Tax Code ID",
  type: "string",
  required: true,
  comments: "The ID of the tax code to retrieve",
  placeholder: "16",
  example: "16",
  dataSource: "selectTaxCode",
  clean: cleanStringInput,
});
