import { input, util } from "@prismatic-io/spectral";
import { connection } from "./common";
import { pollResourceModel } from "../util";



const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments: "The type of resource to poll for changes.",
  example: "components",
  placeholder: "Select resource type",
  clean: util.types.toString,
});

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, newly created records are included in the trigger output.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records updated after the last poll are included in the trigger output.",
  clean: util.types.toBool,
});


export const pollChangesInputs = {
  connection,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
};
