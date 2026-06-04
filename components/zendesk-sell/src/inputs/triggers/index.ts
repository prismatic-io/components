import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "../../constants";
import { connection } from "../common";

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments: "The type of resource to poll for changes.",
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, newly created records will be included in the trigger output.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, records that were updated after the last poll will be included in the trigger output.",
  clean: util.types.toBool,
});

export const pollChangesTriggerInputs = {
  connection,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
};
