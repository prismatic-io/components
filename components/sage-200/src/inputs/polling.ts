import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "../util";
import { connection, site, company } from "./general";


const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments: "The Sage 200 resource type to poll for new or updated records.",
  clean: util.types.toString,
});


const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, newly created records are included in the trigger output.",
  clean: util.types.toBool,
});


const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, records updated after the last poll are included in the trigger output.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection,
  site,
  company,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
};
