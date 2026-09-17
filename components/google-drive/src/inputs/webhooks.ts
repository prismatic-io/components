import { input, util } from "@prismatic-io/spectral";
import { connection, driveId } from "./common";
export const webhookExpirationInput = input({
  type: "string",
  label: "Expiration Time",
  required: false,
  placeholder: "Enter UNIX timestamp in milliseconds",
  comments:
    "The time at which the webhook will expire as a UNIX timestamp in milliseconds. Defaults to 1 hour from now, and can be set to a maximum of 1 day from now.",
  clean: (value) => util.types.toString(value) || undefined,
  example: "1426325213000",
});
export const webhookEndpointInput = input({
  type: "string",
  label: "Endpoint",
  comments: "The URL where webhook notifications will be sent.",
  required: true,
  placeholder: "Enter webhook URL",
  example: "https://your-webhook-endpoint.com/webhook/abc123",
  clean: util.types.toString,
});
const watchedResourceId = input({
  label: "File or Folder ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  placeholder: "Enter File or Folder ID",
  example: "ret08u3rv24htgh289g",
  comments: "The unique identifier of the file or folder to watch for changes.",
});
const channelId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  placeholder: "Enter webhook ID",
  example: "00000000-0000-0000-0000-000000000000",
  comments: "The channel ID returned when the webhook was created.",
});
const channelResourceId = input({
  label: "Resource ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  placeholder: "Enter resource ID",
  example: "ret08u3rv24htgh289g",
  comments: "The resource ID returned when the webhook was created.",
});
export const createDriveWebhookInputs = {
  connection,
  driveId,
  endpoint: webhookEndpointInput,
  expiration: webhookExpirationInput,
};
export const createFileWebhookInputs = {
  connection,
  resourceId: watchedResourceId,
  endpoint: webhookEndpointInput,
  expiration: webhookExpirationInput,
};
export const deleteWebhookInputs = {
  connection,
  webhookId: channelId,
  resourceId: channelResourceId,
};
