import { input, util } from "@prismatic-io/spectral";
import { connection, spaceId, webhookTopics } from "./common";



const webhookUrl = input({
  label: "URL",
  type: "string",
  comments: "The URL where webhook events will be sent.",
  example: "https://example.com/webhook",
  placeholder: "Enter webhook URL",
  required: true,
  clean: util.types.toString,
});

const webhookName = input({
  label: "Name",
  type: "string",
  comments:
    "A descriptive label to identify the webhook in the Contentful dashboard.",
  example: "Example Webhook",
  placeholder: "Enter webhook name",
  required: true,
  clean: util.types.toString,
});

const webhookId = input({
  label: "Webhook ID",
  type: "string",
  comments: "The unique identifier for the webhook.",
  example: "5KsDBWseXY6QegucYAoacS",
  placeholder: "Enter webhook ID",
  required: true,
  clean: util.types.toString,
  dataSource: "selectWebhook",
});



export const createWebhookInputs = {
  connection,
  spaceId,
  name: webhookName,
  url: webhookUrl,
  topics: webhookTopics,
};



export const deleteInstancedWebhooksInputs = {
  connection,
  spaceId,
};



export const deleteWebhookInputs = {
  connection,
  spaceId,
  webhookId,
};



export const getWebhookInputs = {
  connection,
  spaceId,
  webhookId,
};



export const listWebhooksInputs = {
  connection,
  spaceId,
};



export const updateWebhookInputs = {
  connection,
  spaceId,
  name: {
    ...webhookName,
    comments: "The updated name for the webhook.",
  },
  webhookId,
};
