import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean, pollResourceModel } from "../util/polling";
import { connectionInput } from "./common";
const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments: "The QuickBooks entity type to poll for changes.",
  clean: util.types.toString,
});
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, records with `Metadata.CreateTime` after the last poll are included in the `created` bucket.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, records modified after the last poll (but created earlier) are included in the `updated` bucket.",
  clean: util.types.toBool,
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
  pollResourceType,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
