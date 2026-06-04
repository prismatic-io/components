import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "../constants";
import { connection } from "./general";

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  default: "workers",
  comments: "The type of Rippling resource to poll for changes.",
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes newly created records in the results.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes updated records in the results.",
  clean: util.types.toBool,
});

export const pollChangesTriggerInputs = {
  connection,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
};
