import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

const productGroupId = input({
  label: "Product Group ID",
  comments: "The ID of the product group to retrieve.",
  type: "string",
  required: true,
  placeholder: "34634",
  example: "34634",
  dataSource: "selectProductGroup",
  clean: cleanStringInput,
});

export default {
  productGroupId,
};
