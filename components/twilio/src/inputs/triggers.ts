import { input, util } from "@prismatic-io/spectral";
import { cleanString, connectionInput } from "./common";

const fromFilter = input({
  label: "From Filter",
  placeholder: "Enter sender phone number",
  type: "string",
  required: false,
  comments: "The sender phone number to filter polled messages by, in E.164 format. Leave blank to include all senders.",
  example: "+15555551234",
  clean: cleanString,
});

const toFilter = input({
  label: "To Filter",
  placeholder: "Enter recipient phone number",
  type: "string",
  required: false,
  comments: "The recipient phone number to filter polled messages by, in E.164 format. Leave blank to include all recipients.",
  example: "+15551234567",
  clean: cleanString,
});

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, newly sent messages are included in the trigger output.",
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

export const pollChangesTriggerInputs = {
  connection: connectionInput,
  from: fromFilter,
  to: toFilter,
  showNewRecords,
  showUpdatedRecords,
};
