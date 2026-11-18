import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import {
  $skipToken,
  bodyFields,
  changeType,
  connection,
  expirationDateTime,
  fetchAll,
  resource,
} from "./common";

const subscriptionId = input({
  label: "Subscription ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the subscription (UUID format).",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter subscription ID",
  clean: util.types.toString,
  dataSource: "selectSubscription",
});

const notificationUrl = input({
  label: "Notification URL",
  type: "string",
  required: true,
  comments:
    "The URL endpoint that will receive webhook notifications when changes occur.",
  example: "https://example.com/webhook",
  placeholder: "Enter notification URL",
  clean: util.types.toString,
});

const lifecycleNotificationUrl = input({
  label: "Lifecycle Notification URL",
  type: "string",
  required: false,
  comments:
    "The URL endpoint that receives lifecycle notifications (subscriptionRemoved, reauthorizationRequired, missed notifications). Required for Teams resources if the expirationDateTime value is more than 1 hour from now.",
  example: "https://example.com/lifecycle",
  placeholder: "Enter lifecycle notification URL",
  clean: cleanStringInput,
});

export const createSubscriptionInputs = {
  connection,
  changeType,
  notificationUrl,
  resource,
  expirationDateTime,
  lifecycleNotificationUrl,
  bodyFields: {
    ...bodyFields,
    example: JSON.stringify(
      {
        clientState: "secret",
        includeResourceData: true,
      },
      null,
      2,
    ),
  },
};

export const getSubscriptionInputs = {
  connection,
  subscriptionId,
};

export const listSubscriptionsInputs = {
  connection,
  fetchAll,
  $skipToken,
};

export const deleteSubscriptionInputs = {
  connection,
  subscriptionId: {
    ...subscriptionId,
    comments: "The ID of the subscription to delete.",
  },
};

export const deleteAllSubscriptionInputs = {
  connection,
  notificationUrl: {
    ...notificationUrl,
    comments: "The URL from which to delete all subscriptions.",
  },
};

export const updateSubscriptionInputs = {
  connection,
  subscriptionId: {
    ...subscriptionId,
    comments: "The ID of the subscription to update.",
  },
  notificationUrl: {
    ...notificationUrl,
    required: false,
    clean: cleanStringInput,
  },
  expirationDateTime: {
    ...expirationDateTime,
    required: false,
  },
};
