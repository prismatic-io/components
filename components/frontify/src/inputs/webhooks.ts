import { input, util } from "@prismatic-io/spectral";
import { paginationInputs } from "./pagination";
import { connection } from "./sharedInputs";

export const installWebhookInputs = {
  connection,
  projectId: input({
    label: "Workspace Project ID or Library ID",
    type: "string",
    required: true,
    comments:
      "The ID of the Workspace Project or Library to attach the Webhook to.",
    example: "eyJpZGV...",
    placeholder: "eyJpZGV...",
    clean: util.types.toString,
  }),
  name: input({
    label: "Webhook Name",
    type: "string",
    required: true,
    comments: "The name of the Webhook.",
    example: "My Webhook",
    placeholder: "My Webhook",
    clean: util.types.toString,
  }),
  notificationUrl: input({
    label: "Notification URL",
    type: "string",
    required: true,
    comments:
      "The URL that the Webhook will send notifications to when triggered.",
    example: "https://example.com/webhook",
    placeholder: "https://example.com/webhook",
    clean: util.types.toString,
  }),
};

export const listWebhooksInputs = {
  connection,
  ...paginationInputs,
};

export const uninstallWebhookInputs = {
  connection,
  webhookId: input({
    label: "Webhook ID",
    type: "string",
    required: true,
    comments: "The ID of the Webhook to uninstall.",
    example: "eyJpZGV...",
    placeholder: "eyJpZGV...",
    clean: util.types.toString,
    dataSource: "selectWebhook",
  }),
};
