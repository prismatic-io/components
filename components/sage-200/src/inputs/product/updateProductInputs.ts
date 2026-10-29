import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";
import { optionalUpdateBoolean } from "../general";
import sharedInputs from "./sharedInputs";

const productId = input({
  label: "Product ID",
  comments: "The ID of the product to update.",
  type: "string",
  required: true,
  placeholder: "35738",
  example: "35738",
  dataSource: "selectProduct",
  clean: cleanStringInput,
});

const useDescriptionOnDocuments = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.useDescriptionOnDocuments.label,
  comments: sharedInputs.useDescriptionOnDocuments.comments,
});

const allowSalesOrder = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.allowSalesOrder.label,
  comments: sharedInputs.allowSalesOrder.comments,
});

const saleFromSingleBatch = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.saleFromSingleBatch.label,
  comments: sharedInputs.saleFromSingleBatch.comments,
});

const allowDuplicateNumbers = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.allowDuplicateNumbers.label,
  comments: sharedInputs.allowDuplicateNumbers.comments,
});

const usesAlternativeRef = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.usesAlternativeRef.label,
  comments: sharedInputs.usesAlternativeRef.comments,
});

const usesSellByDate = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.usesSellByDate.label,
  comments: sharedInputs.usesSellByDate.comments,
});

const usesUseByDate = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.usesUseByDate.label,
  comments: sharedInputs.usesUseByDate.comments,
});

export default {
  productId,
  ...sharedInputs,
  useDescriptionOnDocuments,
  allowSalesOrder,
  saleFromSingleBatch,
  allowDuplicateNumbers,
  usesAlternativeRef,
  usesSellByDate,
  usesUseByDate,
};
