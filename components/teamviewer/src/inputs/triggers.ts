import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "../constants";
import { connection } from "./general";

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of resource to poll for new records.",
  model: pollResourceModel,
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "Include newly detected records in the trigger output.",
  clean: util.types.toBool,
});

export const pollChangesTriggerInputs = {
  connection,
  pollResourceType,
  showNewRecords,
};
