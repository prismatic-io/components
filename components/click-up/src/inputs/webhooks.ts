import { input, util } from "@prismatic-io/spectral";
import { cleanStringArray } from "../util";
import {
  connectionInput,
  getFolderId,
  getlistId,
  getSpaceId,
  getStatus,
  getTaskId,
  getTeamId,
} from "./common";
const getWebhookId = (required: boolean, comments: string) =>
  input({
    label: "Webhook ID",
    type: "string",
    placeholder: "Enter Webhook ID",
    example: "e506-4a29-9d42-26e504e3435e",
    comments,
    required,
    clean: util.types.toString,
  });
const getEndpoint = (required: boolean, comments: string) =>
  input({
    label: "Endpoint",
    type: "string",
    placeholder: "Enter endpoint URL",
    example: "https://example.com/webhooks/clickup",
    comments,
    required,
    clean: util.types.toString,
  });
const events = input({
  label: "Event",
  type: "string",
  collection: "valuelist",
  placeholder: "Enter event type",
  comments: "Event type to trigger the webhook.",
  example: '["taskCreated", "taskUpdated"]',
  required: true,
  clean: cleanStringArray,
});
const allEvents = input({
  label: "All Events",
  type: "boolean",
  comments:
    "When true, subscribes to all events and overrides the event inputs.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});
export const createWebhookInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
  spaceId: getSpaceId(false),
  folderId: getFolderId(false, "The unique identifier for the Folder."),
  listId: getlistId(false, "The unique identifier for the List."),
  endpoint: getEndpoint(true, "URL of the webhook endpoint."),
  events,
  taskId: getTaskId(false, "The unique identifier for the task."),
};
export const deleteWebhookInputs = {
  clickUpConnection: connectionInput,
  webhookId: getWebhookId(true, "The unique identifier for the webhook."),
};
export const getWebhooksInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
};
export const updateWebhookInputs = {
  clickUpConnection: connectionInput,
  webhookId: getWebhookId(true, "The unique identifier for the webhook."),
  endpoint: getEndpoint(true, "URL of the webhook endpoint."),
  allEvents,
  events,
  status: getStatus(true, "The status to set on the webhook, such as active."),
};
