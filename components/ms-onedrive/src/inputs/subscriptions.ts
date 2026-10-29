import { input, util } from "@prismatic-io/spectral";
import { cleanExpirationDateTime } from "ms-utils";
import { cleanExpirationDays } from "../util/clean";
import { oneDriveConnection } from "./common";

export const changeType = input({
  label: "Change Type",
  type: "string",
  required: true,
  comments:
    "The type of changes that should generate notifications for this subscription. OneDrive only supports 'updated'.",
  example: "updated",
  placeholder: "Select change type",
  default: "updated",
  clean: util.types.toString,
});

const notificationUrl = input({
  label: "Notification URL",
  type: "string",
  required: true,
  comments:
    "The URL where webhook notifications will be delivered. Must be accessible from Microsoft Graph.",
  example: "https://contoso.azurewebsites.net/api/webhook-receiver",
  placeholder: "Enter notification URL",
  clean: util.types.toString,
});

export const resource = input({
  label: "Resource",
  type: "string",
  required: true,
  comments:
    "The Microsoft Graph resource path to monitor for changes. See [Microsoft Graph documentation](https://learn.microsoft.com/en-us/graph/api/resources/subscription) for valid resource paths.",
  example: "/me/drive/root",
  placeholder: "Enter resource path",
  clean: util.types.toString,
});

export const expirationDateTime = input({
  label: "Expiration Date Time",
  type: "string",
  required: true,
  comments:
    "The date and time when the subscription expires in ISO 8601 format. Maximum is 30 days from now for OneDrive resources.",
  example: "2025-12-31T23:59:59.000Z",
  placeholder: "Enter expiration date (ISO 8601)",
  clean: cleanExpirationDateTime,
});

export const clientState = input({
  label: "Client State",
  type: "string",
  required: false,
  comments:
    "An optional validation token that is passed back in each notification for verification purposes.",
  example: "client-specific-validation-token",
  placeholder: "Enter client state token",
  clean: util.types.toString,
});

export const subscriptionId = input({
  label: "Subscription Id",
  type: "string",
  required: true,
  comments: "The unique identifier of the subscription.",
  example: "48bf81d7-2d37-40a9-b47b-c1d1960d00f87",
  placeholder: "Enter subscription ID",
  dataSource: "selectSubscription",
  clean: util.types.toString,
});

const allowDuplicates = input({
  label: "Allow Duplicates",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, allows multiple subscriptions for the same endpoint.",
  clean: util.types.toBool,
});

const showInstanceSubscriptions = input({
  label: "Show Instance Subscriptions",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, shows only subscriptions associated with this instance.",
  clean: util.types.toBool,
});

const expirationDays = input({
  label: "Expiration Days",
  type: "string",
  comments:
    "Number of days to extend the subscription (1-30). Maximum is 30 days for OneDrive resources.",
  example: "3",
  placeholder: "Enter number of days",
  default: "3",
  required: false,
  clean: cleanExpirationDays,
});

export const createSubscriptionInputs = {
  oneDriveConnection,
  changeType,
  notificationUrl,
  resource,
  expirationDateTime,
  clientState,
  allowDuplicates,
};

export const deleteSubscriptionInputs = {
  oneDriveConnection,
  subscriptionId,
};

export const deleteSubscriptionsInputs = {
  oneDriveConnection,
};

export const listSubscriptionsInputs = {
  oneDriveConnection,
  showInstanceSubscriptions,
};

export const renewSubscriptionInputs = {
  oneDriveConnection,
  subscriptionId,
  expirationDays,
};
