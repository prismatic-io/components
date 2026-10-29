import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../util";
import { connectionInput } from "./common";

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments:
    "When true, sheets created since the last poll are returned in the trigger payload.",
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments:
    "When true, sheets modified since the last poll are returned in the trigger payload.",
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
  showNewRecords,
  showUpdatedRecords,
};

export const smartsheetWebhookInputs = {};
