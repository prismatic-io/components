import { input, util } from "@prismatic-io/spectral";
import { attributeJson, optionJson, productJson } from "../constants";
import {
  connectionInput,
  fetchAll,
  searchCriteriaConditionType,
  searchCriteriaCurrentPage,
  searchCriteriaField,
  searchCriteriaPageSize,
  searchCriteriaSortDirection,
  searchCriteriaSortField,
  searchCriteriaValue,
} from "./common";
export const product = input({
  label: "Product",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The product to save, as a JSON object under a `product` key. The default value lists every field the endpoint accepts; remove the ones that do not apply.",
  placeholder: "Enter the product as JSON",
  default: JSON.stringify(productJson, null, 2),
  clean: util.types.toObject,
});
export const attribute = input({
  label: "Product Attribute",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The product attribute to save, as a JSON object under an `attribute` key. The default value lists every field the endpoint accepts; remove the ones that do not apply.",
  placeholder: "Enter the product attribute as JSON",
  default: JSON.stringify(attributeJson, null, 2),
  clean: util.types.toObject,
});
export const option = input({
  label: "Product Option",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The custom product option to save, as a JSON object under an `option` key. The option is tied to a product through its `product_sku` field. The default value lists every field the endpoint accepts.",
  placeholder: "Enter the product option as JSON",
  default: JSON.stringify(optionJson, null, 2),
  clean: util.types.toObject,
});
export const createProductAttributesInputs = {
  connection: connectionInput,
  attribute,
};
export const createProductOptionsInputs = {
  connection: connectionInput,
  option,
};
export const createProductsInputs = {
  connection: connectionInput,
  product,
};
export const listProductAttributesInputs = {
  connection: connectionInput,
  fetchAll,
  searchCriteriaCurrentPage,
  searchCriteriaPageSize,
  searchCriteriaConditionType,
  searchCriteriaField,
  searchCriteriaValue,
  searchCriteriaSortDirection,
  searchCriteriaSortField,
};
export const listProductOptionTypesInputs = {
  connection: connectionInput,
};
export const listProductsInputs = {
  connection: connectionInput,
  fetchAll,
  searchCriteriaCurrentPage,
  searchCriteriaPageSize,
  searchCriteriaConditionType,
  searchCriteriaField,
  searchCriteriaValue,
  searchCriteriaSortDirection,
  searchCriteriaSortField,
};
export const listProductTypesInputs = {
  connection: connectionInput,
};
