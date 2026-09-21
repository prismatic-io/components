import { input, util } from "@prismatic-io/spectral";
import { cleanLookBackDate, pollResourceModel } from "../util";
import { connection } from "./common";
const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments: "The Sage Intacct object to poll for new or updated records.",
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
    "When true, records updated since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
const lookBackDate = input({
  label: "Look-back Date",
  type: "string",
  required: false,
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once.",
  example: "2026-01-01",
  clean: cleanLookBackDate,
});
export const pollChangesInputs = {
  connection,
  pollResourceType,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
