import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "../utils/filterByTimestamp";
import { lookBackDateClean } from "../utils/lookBackDateClean";
import { connection } from "./connections";

const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments:
    "The Gorgias resource type to poll for newly created or updated records.",
  example: "tickets",
  clean: util.types.toString,
});

const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once, ignoring the trigger's visibility filters.",
  example: "2026-01-01",
  clean: lookBackDateClean,
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
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
