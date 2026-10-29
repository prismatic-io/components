import { input, util } from "@prismatic-io/spectral";
import { cleanString, connectionInput } from "./common";
import { lookBackDateClean } from "../util";

const fromFilter = input({
  label: "From Filter",
  placeholder: "Enter sender phone number",
  type: "string",
  required: false,
  comments:
    "The sender phone number to filter polled messages by, in E.164 format. Leave blank to include all senders.",
  example: "+15555551234",
  clean: cleanString,
});

const toFilter = input({
  label: "To Filter",
  placeholder: "Enter recipient phone number",
  type: "string",
  required: false,
  comments:
    "The recipient phone number to filter polled messages by, in E.164 format. Leave blank to include all recipients.",
  example: "+15551234567",
  clean: cleanString,
});

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, newly sent messages are included in the trigger output.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "Reserved for shape consistency with other polling triggers. Twilio polling does not detect status changes to already-sent messages (use the webhook trigger for status callbacks). The 'updated' bucket is always empty.",
  clean: util.types.toBool,
});

export const webhookInputs = {};

const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record sent on or after this date once, ignoring the visibility filters. A window of more than 10,000 messages is delivered over several recurrences, 10,000 at a time.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});

export const pollChangesTriggerInputs = {
  connection: connectionInput,
  lookBackDate,
  from: fromFilter,
  to: toFilter,
  showNewRecords,
  showUpdatedRecords,
};
