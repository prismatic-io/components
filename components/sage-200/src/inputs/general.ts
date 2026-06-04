import { input } from "@prismatic-io/spectral";
import { cleanDate, cleanOptionalBoolean, cleanStringInput } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const site = input({
  label: "Site",
  type: "string",
  comments:
    "The site ID. You can get and reference this value from the 'Get Site and Company Information' action.",
  required: true,
  example: "9e12a1b-caa9-ca01-dcca-08dc12dd123a",
  placeholder: "9e12a1b-caa9-ca01-dcca-08dc12dd123a",
  clean: cleanStringInput,
});
export const company = input({
  label: "Company",
  type: "string",
  comments:
    "The company ID. You can get and reference this value from the 'Get Site and Company Information' action.",
  required: true,
  example: "14123",
  placeholder: "14123",
  clean: cleanStringInput,
});

export const filterDataAfterDate = input({
  label: "Filter Data After Date",
  type: "string",
  comments: "Filter data to only include items that have been updated after this date.",
  required: false,
  example: "2021-01-01T00:00:00Z",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanDate,
});

export const optionalUpdateBoolean = input({
  label: "",
  type: "string",
  required: false,
  model: [
    { label: "No Update", value: "undefined" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  default: "undefined",
  comments: "",
  clean: cleanOptionalBoolean,
});
