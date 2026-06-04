import { input, util } from "@prismatic-io/spectral";
import { WEBHOOK_ENCODE_AS_OPTIONS } from "../constants";
import { toOptionalString } from "../utils";
import { connection } from "./common";


export const webhookName = input({
  label: "Webhook Name",
  type: "string",
  required: true,
  placeholder: "Enter webhook name",
  comments:
    "The name of the webhook. Used in Datadog monitor notifications as @webhook-NAME.",
  example: "my-integration-webhook",
  clean: util.types.toString,
});


export const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  placeholder: "Enter webhook URL",
  comments: "The URL of the webhook endpoint that will receive the data.",
  example: "https://hooks.example.com/datadog",
  clean: util.types.toString,
});


export const webhookCustomHeaders = input({
  label: "Custom Headers",
  type: "code",
  required: false,
  language: "json",
  comments:
    "Custom headers to attach to webhook requests as a JSON string. Useful for authentication headers.",
  example: '{"Authorization": "Bearer my-token"}',
  clean: toOptionalString,
});


export const webhookEncodeAs = input({
  label: "Encode As",
  type: "string",
  required: false,
  model: WEBHOOK_ENCODE_AS_OPTIONS,
  comments: 'Encoding type for the webhook payload. Defaults to "json".',
  clean: toOptionalString,
});


export const webhookPayload = input({
  label: "Payload",
  type: "code",
  required: false,
  language: "json",
  comments:
    "Custom JSON payload for the webhook. If not provided, uses the default Datadog payload with standard variables like $ALERT_TITLE, $ALERT_STATUS, etc.",
  clean: toOptionalString,
});





export const createWebhookInputs = {
  connection,
  webhookName,
  webhookUrl,
  webhookCustomHeaders,
  webhookEncodeAs,
  webhookPayload,
};

export const updateWebhookInputs = {
  connection,
  webhookName,
  webhookUrl: { ...webhookUrl, required: false },
  webhookCustomHeaders,
  webhookEncodeAs,
  webhookPayload,
};

export const getWebhookInputs = {
  connection,
  webhookName,
};

export const deleteWebhookInputs = {
  connection,
  webhookName,
};
