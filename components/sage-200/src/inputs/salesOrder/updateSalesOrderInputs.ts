import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";
import { optionalUpdateBoolean } from "../general";
import sharedInputs from "./sharedInputs";

const salesOrderId = input({
  label: "Sales Order ID",
  comments: "Sales order ID to update",
  type: "string",
  required: true,
  placeholder: "38294",
  example: "38294",
  dataSource: "selectSalesOrder",
  clean: cleanStringInput,
});

const isEditing = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.isEditing.label,
  comments: sharedInputs.isEditing.comments,
});
const isToSequenceLines = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.isToSequenceLines.label,
  comments: sharedInputs.isToSequenceLines.comments,
});
const overrideOnHold = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.overrideOnHold.label,
  comments: sharedInputs.overrideOnHold.comments,
});
const recalculatePrices = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.recalculatePrices.label,
  comments: sharedInputs.recalculatePrices.comments,
});
const applyAvailableDocumentDiscountPercent = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.applyAvailableDocumentDiscountPercent.label,
  comments: sharedInputs.applyAvailableDocumentDiscountPercent.comments,
});
const suppressWarnings = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.suppressWarnings.label,
  comments: sharedInputs.suppressWarnings.comments,
});
const useInvoiceAddress = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.useInvoiceAddress.label,
  comments: sharedInputs.useInvoiceAddress.comments,
});
const isTriangulated = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.isTriangulated.label,
  comments: sharedInputs.isTriangulated.comments,
});

export default {
  salesOrderId,
  ...sharedInputs,
  isEditing,
  isToSequenceLines,
  overrideOnHold,
  recalculatePrices,
  applyAvailableDocumentDiscountPercent,
  suppressWarnings,
  useInvoiceAddress,
  isTriangulated,
};
