import { input, util } from "@prismatic-io/spectral";
import {
  EVENT_NAMES_MODEL,
  USER_SUBSCRIPTION_STATUS_MODEL,
} from "../constants";
import { toOptionalString } from "../util";
import { connection, userSubscriptionKey } from "./common";

export const webhookUrl = input({
  label: "Webhook URL",
  comments:
    "The HTTPS URL that receives posted webhook events. The endpoint must return 200 OK for GET requests.",
  type: "string",
  required: true,
  example: "https://example.com/webhook",
  placeholder: "Enter a webhook URL",
  clean: util.types.toString,
});

export const eventName = input({
  label: "Event Name",
  comments: "The event to subscribe to.",
  type: "string",
  required: true,
  model: EVENT_NAMES_MODEL,
  clean: util.types.toString,
});

export const eventVersion = input({
  label: "Event Version",
  comments: "The schema version of the event payload to receive.",
  type: "string",
  required: true,
  default: "1.0.0",
  clean: util.types.toString,
});

export const userSubscriptionKeys = input({
  label: "User Subscription Keys",
  comments:
    "The user subscription keys to act upon. Provide a JSON array of key strings.",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(["subscription_id1", "subscription_id2"], null, 2),
  clean: (value: unknown) => {
    return (util.types.toObject(value) as unknown[]).map((us: unknown) => {
      return util.types.toString(us);
    });
  },
});

export const deleteWebhook = input({
  label: "Delete Webhooks",
  comments:
    "When true, the affiliated webhook is deleted along with the" +
    " user subscription. Note that deleting the webhook will" +
    " also delete any other user subscriptions tied to the" +
    " corresponding webhook key.",
  type: "boolean",
  required: true,
  clean: util.types.toBool,
});

export const webhookKey = input({
  label: "Webhook Key",
  comments: "The unique identifier for the webhook to update.",
  type: "string",
  required: true,
  example: "webhookKey1",
  placeholder: "Enter a webhook key",
  clean: util.types.toString,
});

export const updateUserSubscriptionKey = input({
  label: "User Subscription Key",
  comments: "The unique identifier for the user subscription to update.",
  type: "string",
  required: true,
  example: "userSubscriptionKey1",
  placeholder: "Enter a user subscription key",
  clean: util.types.toString,
});

export const userSubscriptionState = input({
  label: "User Subscription State",
  comments: "The status to apply to the user subscription.",
  type: "string",
  required: true,
  example: "ACTIVE",
  placeholder: "Enter a subscription state",
  clean: util.types.toString,
  model: USER_SUBSCRIPTION_STATUS_MODEL,
});

export const getUserSubscriptionInputs = {
  connection,
  userSubscriptionKey,
};

export const listUserSubscriptionsInputs = {
  connection,
};

export const createUserSubscriptionInputs = {
  connection,
  webhookUrl,
  eventName,
  eventVersion,
};

export const updateUserSubscriptionInputs = {
  connection,
  webhookKey,
  userSubscriptionKey: updateUserSubscriptionKey,
  userSubscriptionState,
  callbackUrl: {
    ...webhookUrl,
    required: false,
    clean: toOptionalString,
  },
};

export const deleteUserSubscriptionInputs = {
  connection,
  userSubscriptionKeys,
  deleteWebhook,
};
