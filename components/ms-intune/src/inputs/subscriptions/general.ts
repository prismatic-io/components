import { input, util } from "@prismatic-io/spectral";
import { cleanArrayInput, cleanStringInput } from "../../util";

export const subscriptionId = input({
  label: "Subscription ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the subscription (UUID format).",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter subscription ID",
  clean: util.types.toString,
  dataSource: "selectSubscription",
});

export const notificationUrl = input({
  label: "Notification URL",
  type: "string",
  required: true,
  comments:
    "The URL endpoint that will receive webhook notifications when changes occur.",
  example: "https://example.com/webhook",
  placeholder: "Enter notification URL",
  clean: util.types.toString,
});

export const lifecycleNotificationUrl = input({
  label: "Lifecycle Notification URL",
  type: "string",
  required: false,
  comments:
    "The URL endpoint that receives lifecycle notifications (subscriptionRemoved, reauthorizationRequired, missed notifications). Required for Teams resources if the expirationDateTime value is more than 1 hour from now.",
  example: "https://example.com/lifecycle",
  placeholder: "Enter lifecycle notification URL",
  clean: cleanStringInput,
});

export const expirationDateTime = input({
  label: "Expiration Date Time",
  type: "string",
  required: false,
  comments:
    "The date and time when the webhook subscription expires in UTC format (ISO 8601). The maximum duration varies by resource type. [Learn more](https://learn.microsoft.com/en-us/graph/api/resources/subscription)",
  example: "2025-12-31T23:59:59.0000000Z",
  placeholder: "Enter expiration date/time",
  clean: util.types.toString,
});

export const changeType = input({
  label: "Change Type",
  type: "string",
  collection: "valuelist",
  required: true,
  comments:
    "The type of change that will trigger notifications. Select one or more change types to monitor.",
  model: [
    { label: "Created", value: "created" },
    { label: "Updated", value: "updated" },
    { label: "Deleted", value: "deleted" },
  ],
  clean: cleanArrayInput,
});

export const resource = input({
  label: "Resource",
  type: "string",
  required: true,
  comments:
    "The Microsoft Graph resource path to monitor for changes (e.g., users, groups, devices/managedDevices). [Learn more](https://learn.microsoft.com/en-us/graph/api/resources/change-notifications-api-overview?view=graph-rest-1.0)",
  example: "users",
  placeholder: "Enter resource path",
  clean: util.types.toString,
});

export const triggerSubscriptionInputs = {
  expirationDateTime,
  changeType,
  resource,
};
