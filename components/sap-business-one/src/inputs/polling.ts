import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "../util";


const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments: "The SAP Business One resource type to poll for new or updated records.",
  clean: util.types.toString,
});


const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, newly created records will be included in the trigger output.",
  clean: util.types.toBool,
});


const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records that were updated after the last poll will be included in the trigger output.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
};
