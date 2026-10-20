import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../util";
import { connectionInput } from "./common";
const showNewEmployees = input({
  label: "Show New Employees",
  type: "boolean",
  required: false,
  default: "true",
  example: "true",
  comments:
    "When true, employees inserted since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
const showUpdatedEmployees = input({
  label: "Show Updated Employees",
  type: "boolean",
  required: false,
  default: "true",
  example: "true",
  comments:
    "When true, employees updated or deleted since the last poll are included in the trigger output. Inspect the `action` field on each record to distinguish updates from deletions.",
  clean: util.types.toBool,
});
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once, ignoring the field and visibility filters.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
export const pollChangesInputs = {
  connection: connectionInput,
  lookBackDate,
  showNewEmployees,
  showUpdatedEmployees,
};
