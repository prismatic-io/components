import { input, util } from "@prismatic-io/spectral";
import { headers } from "@prismatic-io/spectral/dist/clients/http/inputs";
import { cleanHeaders } from "../util";
import {
  additionalProperties,
  connection,
  expirationDateTime,
  getAllPaginatedResults,
} from "./common";

const changeType = input({
  label: "Change Type",
  type: "string",
  required: true,
  comments:
    "Indicates the type of change in the subscribed resource that raises a change notification. The supported values are: created, updated, deleted. Multiple values can be combined using a comma-separated list.",
  example: "created",
  placeholder: "Enter change type (e.g., created,updated,deleted)",
  clean: util.types.toString,
});

const notificationUrl = input({
  label: "Notification URL",
  type: "string",
  required: true,
  comments: "The URL of the endpoint that receives the change notifications.",
  example: "https://webhook.azurewebsites.net/api/send/myNotifyClient",
  placeholder: "Enter notification URL",
  clean: util.types.toString,
});

const resource = input({
  label: "Resource",
  type: "string",
  required: true,
  comments:
    "The resource that will be monitored for changes. See [supported resources](https://learn.microsoft.com/en-us/graph/api/resources/change-notifications-api-overview?view=graph-rest-1.0) for a full list.",
  example: "/users",
  placeholder: "Enter resource path (e.g., /users)",
  clean: util.types.toString,
});

export const createSubscriptionInputs = {
  connection,
  changeType,
  notificationUrl,
  resource,
  expirationDateTime,
  additionalProperties: input({
    ...additionalProperties,
    comments: `${additionalProperties.comments} See [Create Subscription API](https://learn.microsoft.com/en-us/graph/api/subscription-post-subscriptions).`,
  }),
  headers: input({
    ...headers,
    clean: cleanHeaders,
  }),
};

const subscriptionId = input({
  label: "Subscription ID",
  type: "string",
  required: true,
  comments: "The ID of the subscription to delete.",
  example: "12345678-1234-1234-1234-123456789012",
  placeholder: "Enter Subscription ID",
  clean: util.types.toString,
  dataSource: "selectSubscription",
});

export const deleteSubscriptionInputs = { connection, subscriptionId };

export const getSubscriptionInputs = {
  connection,
  subscriptionId: input({
    ...subscriptionId,
    comments: "The ID of the subscription to read.",
  }),
};

export const listSubscriptionsInputs = {
  connection,
  getAllPaginatedResults: input({
    ...getAllPaginatedResults,
    comments: "When true, automatically fetches all pages of subscriptions.",
  }),
};

export const updateSubscriptionInputs = {
  connection,
  subscriptionId: input({
    ...subscriptionId,
    comments: "The ID of the subscription to update.",
  }),
  notificationUrl: input({
    ...notificationUrl,
    required: false,
  }),
  expirationDateTime: input({
    ...expirationDateTime,
    required: false,
  }),
};

export const deleteInstancedSubscriptionsInputs = {
  connection,
};
