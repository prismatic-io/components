import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../util";
export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes new records in the results.",
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
export const lookBackDate = input({
  label: "Look-back Date",
  type: "string",
  required: false,
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  example: "2026-01-01",
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record created on or after this date once, ignoring the visibility toggles.",
  clean: lookBackDateClean,
});
