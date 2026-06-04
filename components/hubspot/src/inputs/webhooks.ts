import { input, util } from "@prismatic-io/spectral";
import { EVENT_TYPES, EVENT_TYPES_PROPERTY_CHANGE } from "../constants";
import { valueListInputClean } from "../util";

export const eventType = input({
  type: "string",
  label: "Event Type",
  placeholder: "Select event type",
  model: [...EVENT_TYPES, ...EVENT_TYPES_PROPERTY_CHANGE],
  comments:
    "Type of event to listen for. Can be one of create, delete, deletedForPrivacy, or propertyChange.",
  required: true,
  clean: util.types.toString,
});

export const propertyWebhookName = input({
  type: "string",
  label: "Property Name",
  placeholder: "Enter property name",
  comments:
    "The internal name of the property to monitor for changes. Only applies when eventType is propertyChange.",
  required: false,
  example: "email",
  clean: util.types.toString,
});

export const active = input({
  type: "boolean",
  label: "Active",
  comments: "When true, the subscription is active. When false, the subscription is paused.",
  required: true,
  default: "false",
  clean: util.types.toBool,
});

export const subscriptionId = input({
  label: "Subscription ID",
  type: "string",
  placeholder: "Enter Subscription ID",
  example: "123456789",
  comments: "The ID of the subscription to delete",
  dataSource: "selectWebhook",
  required: true,
});

export const overwriteWebhookSettings = input({
  label: "Overwrite Webhook Settings",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, overwrites existing webhook settings. HubSpot only permits one Target URL per App ID.",
  clean: util.types.toBool,
});

export const eventTypes = input({
  type: "string",
  collection: "valuelist",
  label: "Event Types",
  placeholder: "contact.creation",
  model: EVENT_TYPES,
  comments: "Events to listen for. Make sure to have the right permissions.",
  required: true,
  clean: valueListInputClean,
});
