import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";
export const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the webhook.",
  clean: util.types.toString,
  example: "7",
  placeholder: "Enter webhook ID",
});
export const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  comments: "The URL where webhook events will be sent.",
  example: "https://hooks.example.com/webhook/abc123",
  placeholder: "Enter webhook URL",
  clean: util.types.toString,
});
export const webhookDetails = input({
  label: "Webhook Details",
  type: "code",
  language: "json",
  required: true,
  comments:
    "Webhook Details payload to send in this create request; must match structure of `webhooks` property for the [Register Dynamic Webhook endpoint](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks/#api-rest-api-3-webhook-post).",
  clean: util.types.toObject,
  example: JSON.stringify(
    [
      {
        events: [
          "attachment_archived",
          "attachment_created",
          "attachment_removed",
        ],
        fieldIdsFilter: ["summary", "customfield_10029"],
        filter: "project = PROJ",
      },
      {
        events: ["page_restored"],
        filter: "project IN (PROJ, EXP) AND status = done",
      },
      {
        events: ["relation_deleted"],
        filter: "project = PROJ",
      },
    ],
    null,
    2,
  ),
});
export const createWebhookInputs = {
  connectionInput,
  webhookUrl,
  webhookDetails,
};
export const deleteWebhookInputs = {
  connectionInput,
  webhookId,
};
export const listWebhooksInputs = {
  connectionInput,
};
export const refreshWebhookInputs = {
  connectionInput,
  webhookId,
};
