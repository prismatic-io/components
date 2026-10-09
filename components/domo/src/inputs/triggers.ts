import { input, util } from "@prismatic-io/spectral";
import { resourceModel } from "../constants";
import { lookBackDateClean } from "../util";
import { connection } from "./common";
export const resourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: resourceModel,
  comments: "The type of resource to monitor for changes.",
  clean: util.types.toString,
});
export const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record created or modified on or after this date once, ignoring the visibility filters.",
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
  comments:
    "When true, includes updated records in the results. Only available for resource types that support update tracking (DataSets, Streams, Users).",
  clean: util.types.toBool,
});
export const pollChangesTriggerInputs = {
  connection,
  resourceType,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
