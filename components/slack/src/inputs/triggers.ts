import { input, util } from "@prismatic-io/spectral";
import { channelId, connectionInput } from "./common";





export const responseBody = input({
  label: "Response Body",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The response body to return to Slack. Leave empty for no response body.",
  clean: (value) =>
    value ? JSON.parse(util.types.toString(value)) : undefined,
});

export const contentType = input({
  label: "Content Type",
  default: "text/plain",
  type: "string",
  model: [
    { label: "text/plain", value: "text/plain" },
    { label: "application/json", value: "application/json" },
  ],
  required: true,
  comments: "The content type of the response returned to Slack.",
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, new messages in the channel are included in the trigger output.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, includes updated messages in the trigger output. Reserved for shape consistency with other polling triggers — Slack messages are immutable through `conversations.history`, so the `updated` bucket is always empty (use the webhook trigger to receive `message_changed` events).",
  clean: util.types.toBool,
});





export const webhookInputs = {
  slackConnection: connectionInput,
};

export const slashCommandWebhookInputs = {
  responseBody,
  contentType,
};

export const pollChangesInputs = {
  connection: connectionInput,
  channelId,
  showNewRecords,
  showUpdatedRecords,
};
