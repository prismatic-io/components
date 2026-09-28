import { input, util } from "@prismatic-io/spectral";
import { POLL_RESOURCE_LABELS, POLL_RESOURCE_TYPES } from "../constants";
import { lookBackDateClean } from "../utils";
import { connectionInput } from "./common";
const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  default: "orders",
  model: POLL_RESOURCE_TYPES.map((value) => ({
    label: POLL_RESOURCE_LABELS[value],
    value,
  })),
  comments:
    "The Magento resource collection to poll for new and updated records.",
  clean: util.types.toString,
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
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records whose `created_at` falls after the last poll are included in the payload's `body.data.created` array.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records whose `updated_at` falls after the last poll but were created earlier are included in the payload's `body.data.updated` array.",
  clean: util.types.toBool,
});
export const pollChangesInputs = {
  connection: connectionInput,
  pollResourceType,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
export const myTriggerInputs = {};
