import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "../constants";
import { connectionInput } from "./common";
import { lookBackDateClean } from "../util";

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of Xero resource to poll for new and updated records.",
  model: pollResourceModel,
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include newly created records in trigger results.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include updated records in trigger results.",
  clean: util.types.toBool,
});

const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync returns each record modified on or after this date once, as a new record, ignoring the visibility filters.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});

export const pollChangesTriggerInputs = {
  xeroConnection: connectionInput,
  resourceType: pollResourceType,
  showNewRecords,
  showUpdatedRecords,
  lookBackDate,
};

export const webhookInputs = {
  webhookKey: input({
    label: "Webhook Key",
    type: "string",
    comments:
      "The webhook signing key created when the subscription was set up.",
    example: "up/tz7l0Q9FM6Wyq3Rli0bqJrfqmtl4idswda/LQ==",
    placeholder: "Enter webhook key",
    clean: util.types.toString,
  }),
};
