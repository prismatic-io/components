import { input, util } from "@prismatic-io/spectral";
import { EVENT_DELIVERY_SCHEMAS } from "../constants";
import {
  bodyFields,
  connection,
  fetchAll,
  nextLink,
  topicName,
} from "./general";
import { cleanString } from "../util";

export const resourceGroupName = input({
  label: "Resource Group Name",
  type: "string",
  required: true,
  comments: "The name of the resource group to use.",
  example: "my-resource-group",
  placeholder: "my-resource-group",
  clean: util.types.toString,
});

export const eventSubscriptionName = input({
  label: "Event Subscription Name",
  type: "string",
  required: true,
  comments: "The name of the event subscription to use.",
  example: "myeventsubscriptionxxx",
  placeholder: "myeventsubscriptionxxx",
  dataSource: "selectEventSubscription",
  clean: util.types.toString,
});

export const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  comments:
    "The URL to send the event to. If not provided, the event will be sent to the current flow endpoint.",
  example: "https://example.com/webhook",
  placeholder: "https://example.com/webhook",
  clean: util.types.toString,
});

export const subscriptionId = input({
  label: "Subscription ID",
  type: "string",
  required: true,
  comments: "The ID of the subscription to use.",
  example: "00000000-0000-0000-0000-000000000000",
  placeholder: "00000000-0000-0000-0000-000000000000",
  clean: util.types.toString,
});

export const eventDeliverySchema = input({
  label: "Event Delivery Schema",
  type: "string",
  model: EVENT_DELIVERY_SCHEMAS,
  required: true,
  comments: "The event delivery schema for the event subscription.",
  clean: util.types.toString,
});

export const $filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments:
    "The query used to filter the search results using OData syntax. Filtering is permitted on the 'name' property only and with limited number of OData operations. The following is a valid filter example: $filter=contains(namE, 'PATTERN') and name ne 'PATTERN-1'.",
  example: "contains(namE, 'PATTERN') and name ne 'PATTERN-1'",
  clean: cleanString,
});

export const $top = input({
  label: "Top",
  type: "string",
  required: false,
  comments:
    "The number of results to return per page for the list operation. Valid range for top parameter is 1 to 100. If not specified, the default number of results to be returned is 20 items per page.",
  example: "20",
  clean: cleanString,
});

export const createOrUpdateEventSubscriptionInputs = {
  connection,
  subscriptionId,
  topicName,
  resourceGroupName,
  eventSubscriptionName,
  eventDeliverySchema,
  webhookUrl,
  bodyFields,
};

export const updateEventSubscriptionInputs = {
  connection,
  subscriptionId,
  topicName,
  resourceGroupName,
  eventSubscriptionName,
  eventDeliverySchema: {
    ...eventDeliverySchema,
    required: false,
    clean: cleanString,
  },
  webhookUrl: {
    ...webhookUrl,
    required: false,
    clean: cleanString,
  },
  bodyFields,
};

export const getEventSubscriptionInputs = {
  connection,
  subscriptionId,
  topicName,
  resourceGroupName,
  eventSubscriptionName,
};

export const deleteEventSubscriptionInputs = getEventSubscriptionInputs;

export const listEventSubscriptionsInputs = {
  connection,
  subscriptionId,
  topicName,
  resourceGroupName,
  fetchAll,
  $top,
  $filter,
  nextLink,
};
