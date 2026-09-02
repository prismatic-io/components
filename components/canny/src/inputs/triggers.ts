import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../util";
import { connection } from "./common";
export const webhookInputs = { connection };
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, posts created since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, posts whose status changed since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each post created or status-changed on or after this date once, ignoring the field and visibility filters.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
export const pollPostsInputs = {
  connection,
  showNewRecords,
  showUpdatedRecords,
  lookBackDate,
};
