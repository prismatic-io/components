import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "../constants";
import { lookBackDateClean } from "../utils";
import { connection } from "./general";
export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  default: "workers",
  comments: "The type of Rippling resource to poll for changes.",
  clean: util.types.toString,
});
export const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the first recurrence reports each record created or updated since this date once, still subject to the new and updated record settings.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes newly created records in the results.",
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
export const pollChangesTriggerInputs = {
  connection,
  pollResourceType,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
