import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../util";
import { connection } from "./common";
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes newly created tickets in the results.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes updated tickets in the results.",
  clean: util.types.toBool,
});
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to sync the last 7 days. When set, the first recurrence seeds each ticket updated on or after this date once, applying the same record filters every later recurrence applies.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
export const pollNewAndUpdatedTriggerInputs = {
  connection,
  showNewRecords,
  showUpdatedRecords,
  lookBackDate,
};
