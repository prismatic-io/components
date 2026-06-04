import { input, util } from "@prismatic-io/spectral";
import { incidentEvents, serviceEvents } from "../constants";
import { toOptionalString, toRequiredStringList } from "../util";
import { createWebhookExample, updateWebhookExample } from "./examples";

export const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  example: "sampleWebhookId",
  placeholder: "Enter a webhook ID",
  comments: "The unique identifier for the webhook.",
});

export const incidentEventsInput = input({
  label: "Incident Events",
  type: "string",
  required: true,
  model: incidentEvents,
  collection: "valuelist",
  comments: "The incident events that trigger the webhook.",
  clean: toRequiredStringList,
});

export const webhookDescription = input({
  label: "Webhook Description",
  type: "string",
  required: true,
  example: "This Is An Example Description",
  placeholder: "Enter a webhook description",
  comments: "A descriptive label used to identify the webhook.",
  clean: util.types.toString,
});

export const filterId = input({
  label: "Filter ID",
  type: "string",
  required: true,
  example: "sampleFilterId",
  placeholder: "Enter a filter resource ID",
  comments: "The unique identifier of the object used as the filter.",
  clean: util.types.toString,
});

export const filterType = input({
  label: "Filter Type",
  type: "string",
  required: true,
  comments: "The type of object used as the filter.",
  model: [
    { label: "Account", value: "account_reference" },
    { label: "Service", value: "service_reference" },
    { label: "Team", value: "team_reference" },
  ],
  clean: util.types.toString,
});

export const serviceEventsInput = input({
  label: "Service Events",
  type: "string",
  required: true,
  model: serviceEvents,
  collection: "valuelist",
  comments: "The service events that trigger the webhook.",
  clean: toRequiredStringList,
});

export const createWebhookObject = input({
  label: "Webhook Subscription",
  type: "code",
  language: "json",
  required: true,
  example: createWebhookExample,
  clean: util.types.toObject,
  comments:
    "The JSON object body describing the webhook subscription to create.",
});

export const updateWebhookObject = input({
  label: "Update Webhook Payload",
  type: "code",
  language: "json",
  required: true,
  example: updateWebhookExample,
  comments:
    "The JSON object body describing the updated webhook subscription.",
  clean: util.types.toObject,
});



export const listFilterType = input({
  label: "Filter Type",
  type: "string",
  required: false,
  model: [
    { label: "Service", value: "service" },
    { label: "Team", value: "team" },
  ],
  clean: toOptionalString,
  comments: "The type of resource to filter results upon.",
});

export const listFilterId = input({
  label: "Filter ID",
  type: "string",
  required: false,
  clean: toOptionalString,
  example: "123",
  placeholder: "Enter a filter resource ID",
  comments: "The unique identifier of the resource to filter results upon.",
});
