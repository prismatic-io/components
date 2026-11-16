import { input, util } from "@prismatic-io/spectral";
import {
  changeType,
  clientState,
  connection,
  expirationDateTime,
  listId,
  resource,
  siteId,
} from "./common";
import {
  cleanExpirationDays,
  cleanSiteListExpirationDateTime,
  toOptionalString,
} from "../util/clean";

const notificationUrl = input({
  label: "Notification URL",
  type: "string",
  required: true,
  placeholder: "Enter notification URL",
  comments: "The URL where Microsoft Graph will deliver webhook notifications when changes occur.",
  example: "https://contoso.azurewebsites.net/api/webhook-receiver",
  clean: util.types.toString,
});

const subscriptionId = input({
  label: "Subscription ID",
  type: "string",
  required: true,
  placeholder: "Enter subscription ID",
  comments: "The unique identifier of the subscription to manage.",
  example: "48bf81d7-2d37-40a9-b47b-c1d1960d00f87",
  dataSource: "listSubscriptions",
  clean: util.types.toString,
});

const allowDuplicates = input({
  label: "Allow Duplicates",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, allows creating multiple subscriptions for the same endpoint.",
  clean: util.types.toBool,
});

const showInstanceSubscriptions = input({
  label: "Show Instance Subscriptions",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, filters results to show only subscriptions created by this instance.",
  clean: util.types.toBool,
});

const expirationDays = input({
  label: "Expiration Days",
  type: "string",
  placeholder: "Enter number of days",
  comments:
    "Number of days to extend the subscription (1-30). Renewals are capped at the Microsoft Graph maximum for SharePoint resources, just under 30 days.",
  example: "3",
  default: "3",
  required: false,
  clean: cleanExpirationDays,
});

const siteListExpirationDateTime = input({
  label: "Expiration Date/Time",
  type: "string",
  required: false,
  comments:
    "Expiration date/time for subscription. If unspecified the default will be the current date/time plus 29 days (close to the maximum permitted by the Graph API).",
  placeholder: "Enter expiration date/time (ISO 8601)",
  example: "2026-01-01T11:23:00.000Z",
  clean: cleanSiteListExpirationDateTime,
});

export const createSubscriptionInputs = {
  connection,
  changeType,
  notificationUrl,
  resource,
  expirationDateTime,
  clientState,
  allowDuplicates,
};

export const deleteSubscriptionInputs = {
  connection,
  subscriptionId,
};

export const deleteAllInstanceSubscriptionsInputs = {
  connection,
  notificationUrl: {
    ...notificationUrl,
    comments:
      "The notification URL used when creating subscriptions for this instance. Only subscriptions with this URL will be deleted. If not provided, all subscriptions for this flow will be deleted.",
    required: false,
    clean: toOptionalString,
  },
};

export const listSubscriptionsInputs = {
  connection,
  showInstanceSubscriptions,
};

export const renewSubscriptionInputs = {
  connection,
  subscriptionId,
  expirationDays,
};

export const createSiteListSubscriptionInputs = {
  connection,
  siteId,
  listId,
  notificationUrl,
  expirationDateTime: siteListExpirationDateTime,
  allowDuplicates,
};

export const updateSiteListSubscriptionExpirationInputs = {
  connection,
  subscriptionId,
  expirationDateTime: siteListExpirationDateTime,
};
