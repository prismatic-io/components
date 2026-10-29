import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

const productId = input({
  label: "Product ID",
  comments: "The ID of the product to retrieve.",
  type: "string",
  required: true,
  placeholder: "35738",
  example: "35738",
  dataSource: "selectProduct",
  clean: cleanStringInput,
});

export default {
  productId,
};
