import { input, util } from "@prismatic-io/spectral";
import {
  allowDuplicatesInput,
  changeTypesInput,
  connectionInput,
  expirationDateTimeInput,
  fetchAllInput,
  notificationUrlInput,
  subscriptionIdInput,
} from "./common";

const showInstanceWebhooksInput = input({
  label: "Show Instance Webhooks",
  type: "boolean",
  required: true,
  default: "true",
  example: "true",
  comments: "When true, returns only subscriptions for this instance's webhooks.",
  clean: util.types.toBool,
});

export const listSubscriptionsInputs = {
  connection: connectionInput,
  showInstanceWebhooks: showInstanceWebhooksInput,
  fetchAll: {
    ...fetchAllInput,
    default: "true",
    comments: "When true, automatically fetches all pages of results using pagination.",
  },
};

export const createSubscriptionInputs = {
  connection: connectionInput,
  notificationUrl: notificationUrlInput,
  expirationDateTime: expirationDateTimeInput,
  allowDuplicates: allowDuplicatesInput,
};

export const createEventSubscriptionInputs = createSubscriptionInputs;

export const updateEventSubscriptionInputs = {
  connection: connectionInput,
  subscriptionId: subscriptionIdInput,
  expirationDateTime: expirationDateTimeInput,
};

export const deleteSubscriptionInputs = {
  connection: connectionInput,
  subscriptionId: subscriptionIdInput,
};

export const deleteAllInstanceSubscriptionsInputs = {
  connection: connectionInput,
};

export const createMailFolderSubscriptionInputs = {
  connection: connectionInput,
  changeType: changeTypesInput,
  notificationUrl: notificationUrlInput,
  expirationDateTime: expirationDateTimeInput,
};
