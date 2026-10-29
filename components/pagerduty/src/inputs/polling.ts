import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../util/polling";
import { connectionInput } from "./common";

const showNewIncidents = input({
  label: "Show New Incidents",
  type: "boolean",
  required: false,
  default: "true",
  example: "true",
  comments:
    "When enabled, newly created incidents will be included in the trigger output.",
  clean: util.types.toBool,
});

const lookBackDate = input({
  label: "Look-back Date",
  type: "string",
  required: false,
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  example: "2026-01-01",
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once, ignoring the field and visibility filters.",
  clean: lookBackDateClean,
});

export const pollChangesInputs = {
  connection: connectionInput,
  showNewIncidents,
  lookBackDate,
};
