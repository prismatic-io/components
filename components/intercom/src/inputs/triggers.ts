import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "../constants";

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of resource to poll for new and updated records.",
  model: pollResourceModel,
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include newly created records in trigger results.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include updated records in trigger results.",
  clean: util.types.toBool,
});
