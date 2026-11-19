import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connectionInput, fetchAll } from "./common";

const webhookUrlInput = input({
  label: "Webhook URL",
  required: true,
  type: "string",
  placeholder: "Enter webhook URL",
  comments: "The URL for the webhook subscription.",
  example: "https://example.com/webhooks",
  clean: util.types.toString,
});

const subscriptionTypesInput = input({
  label: "Subscription Types",
  required: true,
  type: "text",
  placeholder: "Enter subscription types",
  comments:
    "Types of notifications to receive when entities change. Enter as comma-separated values.",
  example: "type1,type2",
  clean: util.types.toString,
});

const webhookSubscriptionUuidInput = input({
  label: "Webhook Subscription UUID",
  required: true,
  type: "string",
  placeholder: "Enter webhook subscription UUID",
  comments:
    "The unique identifier of the webhook subscription to retrieve or modify.",
  example: "00000000-0000-0000-0000-000000000000",
  clean: util.types.toString,
});

const startingAfterUuidInput = input({
  label: "Starting After UUID",
  required: false,
  type: "string",
  placeholder: "Enter starting after UUID",
  comments:
    "Serves as a cursor, returns all events occurring after specified UUID (exclusive).",
  clean: toOptionalString,
});

const eventTypeInput = input({
  label: "Event Type",
  required: false,
  type: "string",
  placeholder: "Enter event type",
  comments:
    "A string containing the exact event name or use a wildcard match to filter for a group of events.",
  example: "employee.created",
  clean: toOptionalString,
});

const limitInput = input({
  label: "Limit",
  required: false,
  type: "string",
  placeholder: "Enter limit",
  comments:
    "Limits the number of objects returned in a single response, between 1 and 100. Defaults to 25.",
  clean: toOptionalString,
});

const resourceUuidInput = input({
  label: "Resource UUID",
  required: false,
  type: "string",
  placeholder: "Enter resource UUID",
  comments:
    "The UUID of the company. If not specified, will return all events for all companies.",
  example: "00000000-0000-0000-0000-000000000000",
  clean: toOptionalString,
});

const sortOrderInput = input({
  label: "Sort Order",
  required: false,
  type: "string",
  model: [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ],
  comments:
    "Sort resulting events in ascending (asc) or descending (desc) chronological order.",
  clean: toOptionalString,
});

export const listWebhookSubscriptionsInputs = {
  connection: connectionInput,
};

export const getWebhookSubscriptionInputs = {
  connection: connectionInput,
  webhookSubscriptionUuid: webhookSubscriptionUuidInput,
};

export const createWebhookSubscriptionInputs = {
  connection: connectionInput,
  webhookUrl: webhookUrlInput,
  subscriptionTypes: subscriptionTypesInput,
};

export const updateWebhookSubscriptionInputs = {
  connection: connectionInput,
  webhookSubscriptionUuid: webhookSubscriptionUuidInput,
  subscriptionTypes: subscriptionTypesInput,
};

export const deleteWebhookSubscriptionInputs = {
  connection: connectionInput,
  webhookSubscriptionUuid: webhookSubscriptionUuidInput,
};

const paginationInputs = structuredObjectInput({
  label: "Pagination",
  comments: "Cursor and page-size controls for paging through results.",
  inputs: {
    startingAfterUuid: startingAfterUuidInput,
    limit: limitInput,
  },
});

export const getWebhookEventsInputs = {
  connection: connectionInput,
  resourceUuid: resourceUuidInput,
  eventType: eventTypeInput,
  sortOrder: sortOrderInput,
  fetchAll,
  pagination: paginationInputs,
};
