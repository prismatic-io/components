import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean, pollResourceModel } from "../util";
import { company, connection, site } from "./general";
const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments: "The Sage 200 resource type to poll for new or updated records.",
  clean: util.types.toString,
});
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once, ignoring the visibility filters.",
  example: "2026-01-01",
  clean: lookBackDateClean,
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
  site,
  company,
  pollResourceType,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
