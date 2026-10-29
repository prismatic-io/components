import { input } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../../util";
import sharedInputs from "./sharedInputs";

const code = input({
  label: "Product Code",
  comments: "Product code.",
  type: "string",
  required: true,
  placeholder: "VID003",
  example: "VID003",
  clean: cleanStringInput,
});

const name = input({
  label: "Product Name",
  comments: "Product name.",
  type: "string",
  required: true,
  placeholder: "32mb PCI Video Card",
  example: "32mb PCI Video Card",
  clean: cleanStringInput,
});

const productGroupId = input({
  label: "Product Group ID",
  comments:
    "Product group record Id. See [Sage 200 API documentation](https://developer.sage.com/200/reference/product_groups) for more information.",
  type: "string",
  required: true,
  placeholder: "34646",
  example: "34646",
  dataSource: "selectProductGroup",
  clean: cleanNumberInput,
});

export default {
  code,
  name,
  productGroupId,
  ...sharedInputs,
};
