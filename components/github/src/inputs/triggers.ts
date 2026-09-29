import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../utils";
import {
  connectionInput,
  events,
  owner,
  repo,
  webhookSecretInput,
} from "./common";
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once, ignoring the visibility filters.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, issues created after the last poll are emitted on the `created` branch.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, issues updated since the last poll but created earlier are emitted on the `updated` branch.",
  clean: util.types.toBool,
});
export const pollChangesTriggerInputs = {
  connection: connectionInput,
  owner,
  repo,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
export const webhookInputs = { webhookSecret: webhookSecretInput };
export const eventWebhookInputs = {
  connection: connectionInput,
  owner,
  repo,
  events,
};
