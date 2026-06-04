import { input, util } from "@prismatic-io/spectral";

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, newly created applications are included in the trigger output.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, applications with new activity since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});


export const webhook_name = input({
  label: "Webhook Name",
  type: "string",
  required: true,
  comments: "The descriptive label used to identify the webhook.",
  placeholder: "Enter webhook name",
  example: "My Webhook",
  clean: util.types.toString,
});


export const endpoint_url = input({
  label: "Endpoint URL",
  type: "string",
  required: true,
  comments: "The URL of the endpoint that receives webhook deliveries.",
  placeholder: "Enter webhook URL",
  example: "https://your-webhook-endpoint.com/webhook/abc123",
  clean: util.types.toString,
});

export const secret_key = input({
  label: "Secret Key",
  type: "password",
  required: true,
  comments:
    "The shared secret used to sign and verify the webhook payload signature.",
  placeholder: "Enter secret key",
  example: "3T2eTfOvJbAIRoBpXsXPmq0gn8CmF5Q7",
  clean: util.types.toString,
});
