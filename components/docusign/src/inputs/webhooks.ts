import { input, util } from "@prismatic-io/spectral";
import { toStringArray } from "../util";
import { WEBHOOK_EVENTS } from "../constants";
import { webhookJson } from "../json/webhookJson";
import { connection, jsonInput } from "./common";

const connectId = input({
  label: "Connect ID",
  type: "string",
  required: true,
  comments:
    "The ID of the custom Connect (Webhook) configuration being accessed.",
  example: "10486941",
  placeholder: "Enter Connect ID",
  clean: util.types.toString,
});

const urlToPublishTo = input({
  label: "URL To Publish To",
  type: "string",
  required: true,
  comments: "The URL that DocuSign will publish events to.",
  example: "https://your-webhook-endpoint.com/webhook",
  placeholder: "Enter webhook URL",
  clean: util.types.toString,
});

const webhookName = input({
  label: "Connect (Webhook) Configuration Name",
  type: "string",
  required: true,
  comments:
    "A descriptive name that identifies this Connect configuration in DocuSign.",
  example: "My Webhook Configuration",
  placeholder: "Enter webhook configuration name",
  clean: util.types.toString,
});

const includeHMAC = input({
  label: "Include HMAC",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, the HMAC hash is included in the message along with the API request.",
  clean: util.types.toBool,
});

export const webhookEvents = input({
  label: "Webhook Event",
  type: "string",
  collection: "valuelist",
  model: WEBHOOK_EVENTS.map((event) => ({ label: event, value: event })),
  comments: "The list of event types to subscribe to.",
  placeholder: "Select webhook events",
  required: true,
  clean: toStringArray,
});

export const connectKey = input({
  label: "Connect Key",
  type: "string",
  required: true,
  comments:
    "This key is used to create the HMAC hash that DocuSign will send along with the message. See [setting up HMAC](https://developers.docusign.com/platform/webhooks/connect/setting-up-hmac/) for how to generate a key.",
  placeholder: "Enter Connect key",
  clean: util.types.toString,
});

export const createWebhookInputs = {
  connection,
  urlToPublishTo,
  webhookName,
  webhookEvents,
  includeHMAC,
};

export const deleteAllInstancedWebhooksInputs = {
  connection,
};

export const deleteWebhookInputs = {
  connection,
  connectId: {
    ...connectId,
    comments: "The ID of the custom Connect (Webhook) configuration to delete.",
  },
};

export const getWebhookInputs = {
  connection,
  connectId,
};

export const listWebhooksInputs = {
  connection,
};

export const updateWebhookInputs = {
  connection,
  jsonInput: {
    ...jsonInput,
    required: true,
    default: JSON.stringify(webhookJson, null, 2),
    comments:
      "For extra fields, see the [Update Connect Configuration API reference](https://developers.docusign.com/docs/esign-rest-api/reference/connect/connectconfigurations/update/).",
  },
};
