import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean, toOptionalString } from "../util";
import {
  connection,
  contentTypeId,
  environmentId,
  spaceId,
  webhookTopics,
} from "./common";
const signingSecret = input({
  label: "Webhook Signing Secret",
  placeholder: "Enter webhook signing secret",
  type: "password",
  required: false,
  comments:
    "The space's webhook signing secret, set in Contentful under Settings, Webhooks, Settings with request verification enabled. When provided, each request's signature is verified and unsigned, altered, or expired requests are rejected. Leave empty to skip verification.",
  clean: toOptionalString,
});
export const eventsTriggerInputs = {
  connection,
  spaceId,
  topics: webhookTopics,
  signingSecret,
};
export const webhookInputs = {
  connection,
  signingSecret,
};
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once, ignoring the Show New Entries and Show Updated Entries toggles; the Content Type ID filter still applies.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
const showNewRecords = input({
  label: "Show New Entries",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, entries whose `sys.createdAt` falls after the last poll are emitted on the `created` branch.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Entries",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, entries whose `sys.updatedAt` falls after the last poll but were created earlier are emitted on the `updated` branch.",
  clean: util.types.toBool,
});
export const pollChangesInputs = {
  connection,
  spaceId,
  environmentId,
  lookBackDate,
  contentTypeId: {
    ...contentTypeId,
    required: false,
    comments:
      "Restrict polling to a single content type. Leave blank to poll all entries in the environment.",
    clean: toOptionalString,
  },
  showNewRecords,
  showUpdatedRecords,
};
