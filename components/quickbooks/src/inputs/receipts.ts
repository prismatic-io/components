import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";

export const applyTaxAfterDiscount = input({
  label: "Apply Tax After Discount",
  type: "boolean",
  required: true,
  default: "false",
  comments: "When true, applies tax after discount is calculated.",
  clean: util.types.toBool,
});

export const createTime = input({
  label: "Create Time",
  placeholder: "Enter creation time",
  type: "string",
  required: false,
  example: "2014-09-16T14:59:48-07:00",
  comments: "The date and time when the record was created in ISO 8601 format.",
  clean: cleanStringInput,
});
