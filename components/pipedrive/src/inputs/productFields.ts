import { input, util } from "@prismatic-io/spectral";
import { connectionInput, paginationLimitInput, paginationStartInput } from "./common";

const productFieldId = input({
  label: "Product Field ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier for the product field.",
  example: "123",
  placeholder: "Enter Product Field ID",
});

export const getProductFieldsInputs = {
  connection: connectionInput,
  start: paginationStartInput,
  limit: paginationLimitInput,
};

export const deleteProductFieldInputs = {
  connection: connectionInput,
  id: productFieldId,
};

export const getProductFieldInputs = {
  connection: connectionInput,
  id: productFieldId,
};
