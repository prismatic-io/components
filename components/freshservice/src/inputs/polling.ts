import { input, util } from "@prismatic-io/spectral";

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes newly created tickets in the results.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes updated tickets in the results.",
  clean: util.types.toBool,
});
