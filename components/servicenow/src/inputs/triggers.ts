import { input } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../util";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  showNewRecords,
  showUpdatedRecords,
  tableNameInput,
} from "./common";
export const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once, ignoring the trigger's visibility filters.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
export const pollChangesTriggerInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  tableNameInput,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
