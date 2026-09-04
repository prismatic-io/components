import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean, toOptionalString } from "../util";
import { connectionInput, entityType, filterExpression } from "./common";
const webhookKey = input({
  label: "Webhook Authentication Key",
  placeholder: "Enter webhook authentication key",
  type: "password",
  required: false,
  comments:
    "Optional authentication key for incoming webhook requests. When set, requests must include this value in the '?code' query parameter (Microsoft Dynamics 'Webhook Key' authentication mode). Strongly recommended to prevent unauthorized event spoofing.",
  clean: toOptionalString,
});
export const dynamicsWebhookTriggerInputs = { webhookKey };
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, newly created records will be included in the trigger output.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, records updated after the last poll will be included in the trigger output.",
  clean: util.types.toBool,
});
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the first poll returns all records created or modified on or after this date.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
export const pollChangesInputs = {
  connection: connectionInput,
  entityType,
  lookBackDate,
  filterExpression,
  showNewRecords,
  showUpdatedRecords,
};
