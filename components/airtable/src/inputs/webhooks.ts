import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { baseIdInput, connectionInput } from "./common";

const notificationUrlInput = input({
  label: "Notification URL",
  type: "string",
  required: false,
  placeholder: "Enter notification URL",
  example: "https://your-webhook-endpoint.com/airtable/notifications",
  comments: "The URL that receives notification pings when the webhook fires.",
  clean: toOptionalString,
});

const specificationInput = input({
  label: "Specification",
  type: "code",
  language: "json",
  required: true,
  comments:
    "A JSON object describing the types of changes the webhook listens for.",
  example: JSON.stringify(
    {
      options: {
        filters: {
          fromSources: ["publicApi"],
          dataTypes: ["tableData"],
          recordChangeScope: "tblMwMnUJpKoJUDzo",
        },
      },
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});

const webhookIdInput = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  placeholder: "Enter webhook ID",
  example: "ach00000000000001",
  comments: "The unique identifier for the webhook.",
  dataSource: "selectWebhook",
  clean: util.types.toString,
});

export const listWebhooksInputs = {
  airtableConnection: connectionInput,
  baseId: baseIdInput,
};

export const createWebhookInputs = {
  airtableConnection: connectionInput,
  baseId: baseIdInput,
  notificationUrl: notificationUrlInput,
  specification: specificationInput,
};

export const deleteWebhookInputs = {
  airtableConnection: connectionInput,
  baseId: baseIdInput,
  webhookId: webhookIdInput,
};

export const refreshWebhookInputs = {
  airtableConnection: connectionInput,
  baseId: baseIdInput,
  webhookId: webhookIdInput,
};
