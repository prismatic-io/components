import { input, util } from "@prismatic-io/spectral";
import { cleanCode, cleanNumber, cleanString, cleanValueList } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Azure Event Grid connection to use.",
});

export const eventTopics = input({
  type: "string",
  required: true,
  comments: "The topics to listen for events on",
  label: "Event Topics to Listen For",
  collection: "valuelist",
  clean: cleanValueList,
});

export const queueName = input({
  label: "Queue Name",
  type: "string",
  required: true,
  comments: "The name of the queue to use.",
  example: "my-queue",
  placeholder: "my-queue",
  clean: util.types.toString,
});

export const maxEvents = input({
  label: "Max Events",
  type: "string",
  required: false,
  comments:
    "Max Events count to be received. Minimum value is 1, while maximum value is 100 events. If not specified, the default value is 1.",
  example: "1",
  placeholder: "1",
  clean: cleanNumber,
});

export const topicName = input({
  label: "Topic",
  type: "string",
  required: true,
  comments: "The name of the topic to subscribe to.",
  example: "my-topic",
  placeholder: "my-topic",
  clean: util.types.toString,
});

export const subscriptionName = input({
  label: "Subscription",
  type: "string",
  required: true,
  comments: "The name of the subscription to use.",
  example: "my-subscription",
  placeholder: "my-subscription",
  clean: util.types.toString,
});

export const bodyFields = input({
  label: "Body Fields",
  type: "code",
  language: "json",
  required: false,
  comments: "Extra fields to include in the body of the request.",
  example: JSON.stringify({ key: "value" }, null, 2),
  clean: cleanCode,
});

export const nextLink = input({
  label: "Next Link",
  type: "string",
  required: false,
  comments: "The next link to fetch the next page of results.",
  example:
    "https://management.azure.com/subscriptions/503a76a6-249f-422e-a06a-12345/resourceGroups/AzureEventGrid/providers/Microsoft.EventGrid/topics/AzureTestGrid/providers/Microsoft.EventGrid/eventSubscriptions?api-version=2022-06-15&$skiptoken=%5b%7b%22token%22%3anull%2c%22range%22%3a%7b%22min%22%3a%2205C1DF6B5557E0%22%2c%22max%22%3a%22FF%22%7d%7d%5d&$top=20",
  placeholder:
    "https://management.azure.com/subscriptions/503a76a6-249f-422e-a06a-12345/resourceGroups/AzureEventGrid/providers/Microsoft.EventGrid/topics/AzureTestGrid/providers/Microsoft.EventGrid/eventSubscriptions?api-version=2022-06-15&$skiptoken=%5b%7b%22token%22%3anull%2c%22range%22%3a%7b%22min%22%3a%2205C1DF6B5557E0%22%2c%22max%22%3a%22FF%22%7d%7d%5d&$top=20",
  clean: cleanString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments: "When true, fetches all pages of results.",
  clean: util.types.toBool,
});
