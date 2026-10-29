import { input } from "@prismatic-io/spectral";
import { cleanFunctionForBoolean, lookBackDateClean } from "../util";
import { connection } from "./common";

const strictValidation = input({
  label: "Perform Strict Validation",
  type: "boolean",
  required: false,
  comments:
    "When true, performs strict validation on each webhook notification.",
  clean: cleanFunctionForBoolean,
});

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, newly created agreements are included in the trigger output.",
  clean: cleanFunctionForBoolean,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, agreements updated since the last poll are included in the trigger output.",
  clean: cleanFunctionForBoolean,
});

export const adobeSignTriggerInputs = {
  connection,
  strictValidation,
};

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
  connection,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
