import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "../utils/filterByTimestamp";
import { connection } from "./connections";

const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments: "The Gorgias resource type to poll for newly created or updated records.",
  example: "tickets",
  clean: util.types.toString,
});

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, newly created records since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records updated since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
};
