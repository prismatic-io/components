import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../util";
import { connectionInput, events, webhookFriendlyName } from "./common";
const lookBackDate = input({
  label: "Look-back Date",
  type: "string",
  required: false,
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  example: "2026-01-01",
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. SendGrid retains activity for 30 days, so dates older than 30 days are clamped to the retention floor. Leave empty to sync the full 30-day retention window.",
  clean: lookBackDateClean,
});
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "SendGrid surfaces a single `last_event_time` per message with no per-event timeline, so newly created messages cannot be distinguished from updated ones. Every matching record is reported on the `updated` branch, so this input has no effect.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records whose `last_event_time` falls within the polling window are included on the `updated` branch.",
  clean: util.types.toBool,
});
export const pollChangesInputs = {
  sendGridConnection: connectionInput,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
export const eventWebhookInputs = {
  sendGridConnection: connectionInput,
  events,
  friendlyName: webhookFriendlyName,
};
