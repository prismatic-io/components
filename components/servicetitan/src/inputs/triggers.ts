import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../util/cleanInput";
import { pollResourceModel } from "../util/polling";
import { connection } from "./common";
const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of resource to poll for new and updated records.",
  model: pollResourceModel,
  clean: util.types.toString,
});
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "When true, includes newly created records in the trigger results.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "When true, includes updated records in the trigger results.",
  clean: util.types.toBool,
});
const lookBackDate = input({
  label: "Look-back Date",
  type: "string",
  required: false,
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  example: "2026-01-01",
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record created or modified on or after this date once, ignoring the visibility toggles.",
  clean: lookBackDateClean,
});
export const pollChangesTriggerInputs = {
  connection,
  resourceType: pollResourceType,
  showNewRecords,
  showUpdatedRecords,
  lookBackDate,
};
