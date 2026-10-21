import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../utils";
import { connection, restaurantExternalId } from "./shared";
const secret = input({
  label: "Secret",
  comments: "The secret key for the webhook",
  type: "string",
  required: true,
  example: "mysecret",
  placeholder: "mysecret",
  clean: util.types.toString,
});
export const webhookInputs = { secret };
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once, ignoring the visibility filters. The Toast API limits the query window to 30 days, so dates further back are clamped to 30 days before the current time.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
const showNewRecords = input({
  label: "Show New Time Entries",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, newly created time entries will be included in the trigger output.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Time Entries",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, time entries modified after the last poll will be included in the trigger output.",
  clean: util.types.toBool,
});
export const pollChangesInputs = {
  connection,
  restaurantExternalId,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
