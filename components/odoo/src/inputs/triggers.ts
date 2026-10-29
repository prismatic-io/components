import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../util";
import { connection, model } from "./common";

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
    "When true, records whose `create_date` falls after the last poll are emitted in the `created` bucket.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records whose `write_date` falls after the last poll but were created earlier are emitted in the `updated` bucket.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection,
  model,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
