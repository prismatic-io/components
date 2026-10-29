import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanNumberInput, cleanStringInput } from "../utils";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments: "Additional fields that are not covered by the standard inputs.",
  required: false,
  example: JSON.stringify({}, null, 2),
  clean: cleanCodeInput,
});

export const $top = input({
  label: "Top",
  type: "string",
  comments: "The number of records to return at once.",
  required: false,
  example: "50",
  placeholder: "50",
  clean: cleanNumberInput,
});

export const $filter = input({
  label: "Filter",
  type: "string",
  comments: "A filter expression to apply to the results.",
  example: "FullName eq 'Sample Management Team'",
  placeholder: "FullName eq 'Sample Management Team'",
  required: false,
  clean: cleanStringInput,
});

export const $orderby = input({
  label: "Order By",
  type: "string",
  comments: "The property to order the results by.",
  example: "FullName",
  placeholder: "",
  required: false,
  clean: cleanStringInput,
});

export const $skip = input({
  label: "Skip",
  type: "string",
  comments:
    "The number of records to skip when looping over pages of results. If you fetch 100 results, you should skip 0 the first iteration, then 100, 200, 300, etc. until no more records are available.",
  example: "100",
  placeholder: "100",
  required: false,
  clean: cleanNumberInput,
});

export const getAllData = input({
  label: "Get All Data",
  type: "boolean",
  comments:
    "Turn this on to retrieve all pages of data. $top and $skip will be ignored.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const webhookType = input({
  label: "Webhook Type",
  type: "string",
  model: ["Contact", "Work", "Note", "User", "Invoice"].map((value) => ({
    value,
    label: value,
  })),
  comments: "The type of the Webhook.",
  required: true,
  example: "Contact",
  clean: cleanStringInput,
});
