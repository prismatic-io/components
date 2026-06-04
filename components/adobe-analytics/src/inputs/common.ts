import { input, util } from "@prismatic-io/spectral";

export const connectionInput = input({
  label: "Connection",
  required: true,
  type: "connection",
  comments: "The Adobe Analytics connection to use.",
});

export const globalCompanyIdInput = input({
  label: "Global Company ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the analytics company.",
  placeholder: "Enter global company ID",
  example: "exampl123",
  clean: util.types.toString,
});

export const reportSuiteIdInput = input({
  label: "Report Suite ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the report suite to query.",
  placeholder: "Enter report suite ID",
  example: "exampletest",
  clean: util.types.toString,
});
