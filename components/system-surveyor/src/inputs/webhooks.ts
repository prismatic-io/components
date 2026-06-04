import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";

const accountId = input({
  label: "Account ID",
  type: "string",
  required: true,
  comments:
    "The internal ID of the System Surveyor account to register the webhook for.",
  placeholder: "Enter account ID",
  example: "690560",
  clean: util.types.toNumber,
});

const customerId = input({
  label: "Customer ID",
  type: "string",
  required: true,
  comments: "The external customer ID associated with this account.",
  placeholder: "Enter customer ID",
  example: "67890",
  clean: util.types.toString,
});

const webhookName = input({
  label: "Webhook Name",
  type: "string",
  required: true,
  comments: "A name identifier for the webhook.",
  placeholder: "Enter webhook name",
  example: "create_netsuite_quote",
  clean: util.types.toString,
});

const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  comments: "The URL to which the webhook will send POST requests.",
  placeholder: "Enter webhook URL",
  example: "https://mydomain.com/webhook-endpoint",
  clean: util.types.toString,
});

export const registerWebhookInputs = {
  ssvConnection: connectionInput,
  accountId,
  customerId,
  name: webhookName,
  url: webhookUrl,
};
