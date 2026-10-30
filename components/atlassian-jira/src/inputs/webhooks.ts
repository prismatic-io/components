import { input, util } from "@prismatic-io/spectral";
import { connectionInput, fetchAll } from "./common";

const webhookDetails = input({
  label: "Webhook Details",
  type: "code",
  language: "json",
  placeholder: "Enter webhook details JSON",
  required: false,
  comments:
    "The webhook details payload sent to Jira's OAuth2 Webhook API or REST API. Must match the structure of the `webhooks` property described in the [Register Dynamic Webhook endpoint](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks/#api-rest-api-3-webhook-post).",
  clean: util.types.toObject,
  example: JSON.stringify(
    [
      {
        events: ["jira:issue_created", "jira:issue_updated"],
        fieldIdsFilter: ["summary", "customfield_10029"],
        jqlFilter: "project = PROJ",
      },
      {
        events: ["jira:issue_deleted"],
        jqlFilter: "project IN (PROJ, EXP) AND status = done",
      },
      {
        events: ["issue_property_set"],
        issuePropertyKeysFilter: ["my-issue-property-key"],
        jqlFilter: "project = PROJ",
      },
    ],
    null,
    2,
  ),
});

const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  placeholder: "Enter webhook URL",
  required: true,
  example: "https://hooks.example.com/trigger/abc123",
  comments:
    "The URL that Jira will POST webhook events to. Typically reference a flow's URL from the trigger payload.",
  clean: util.types.toString,
});

const webhookIdInput = input({
  label: "Webhook ID",
  type: "string",
  placeholder: "Enter webhook ID",
  required: true,
  example: "10001",
  comments: "The unique identifier of the webhook.",
  dataSource: "selectWebhook",
  clean: util.types.toString,
});

export const createWebhookInputs = {
  jiraConnection: connectionInput,
  webhookUrl,
  webhookDetails,
};

export const deleteWebhookInputs = {
  jiraConnection: connectionInput,
  webhookId: webhookIdInput,
};

export const listWebhooksInputs = {
  jiraConnection: connectionInput,
  fetchAll,
};

export const refreshWebhookInputs = {
  jiraConnection: connectionInput,
  webhookId: {
    ...webhookIdInput,
    comments:
      "The unique identifier of the webhook whose expiration date to extend.",
  },
};
