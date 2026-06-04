import { input, util } from "@prismatic-io/spectral";
import { cleanDate, cleanStringInput } from "../../utils";
import { connectionInput } from "../general";

export const showInstanceWebhooks = input({
  label: "Show Instance Webhooks",
  type: "boolean",
  required: false,
  comments: "When true, shows only subscriptions for this Instance's webhooks.",
  clean: util.types.toBool,
});

export const notificationUrl = input({
  label: "Notification URL",
  type: "string",
  required: true,
  comments: "URL to send events of this Subscription to.",
  example: "https://hooks.example.com/trigger/abc123",
  placeholder: "Enter notification URL",
  clean: util.types.toString,
});

export const expirationDateTime = input({
  label: "Expiration Date/Time",
  type: "string",
  required: false,
  comments:
    "Expiration date/time for subscription. If unspecified the default will be the current date/time plus 10070 minutes (close to the maximum permitted by the Graph API).",
  example: "2022-12-31T23:59:59Z",
  placeholder: "Enter expiration date/time (ISO 8601)",
  clean: cleanDate,
});

export const subscriptionId = input({
  label: "Subscription ID",
  type: "string",
  required: true,
  comments: "Subscription ID to manage.",
  example: "7d577253-3ef0-4a0a-bb7f-8335c2596e70",
  placeholder: "Enter subscription ID",
  dataSource: "selectSubscription",
  clean: util.types.toString,
});

export const allowDuplicates = input({
  label: "Allow Duplicates",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, allows more than one webhook per endpoint.",
  clean: util.types.toBool,
});

export const resource = input({
  label: "Resource",
  type: "string",
  required: true,
  comments: "Resource to subscribe to.",
  example: "/api/v1.0/companies(f64eba74-dacd-4854-a584-1834f68cfc3a)/customers",
  placeholder: "Enter resource path",
  clean: util.types.toString,
});

export const etag = input({
  label: "Etag",
  type: "string",
  required: true,
  comments: "Etag value for the subscription to delete.",
  example: 'W/"JzEtNjM3NjQwMzUwMDAwMDAwMCc="',
  placeholder: "Enter etag value",
  clean: util.types.toString,
});

export const createSubscriptionInputs = {
  connection: connectionInput,
  notificationUrl,
  resource,
  allowDuplicates,
};

export const updateSubscriptionInputs = {
  connection: connectionInput,
  subscriptionId,
  etag,
  notificationUrl: {
    ...notificationUrl,
    required: false,
    clean: cleanStringInput,
  },
  resource: {
    ...resource,
    required: false,
    clean: cleanStringInput,
  },
};

export const deleteSubscriptionInputs = {
  connection: connectionInput,
  subscriptionId,
  etag,
};

export const deleteAllSubscriptionsInputs = {
  connection: connectionInput,
};
