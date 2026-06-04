import { notificationUrl, subscriptionId } from "./general";

export const deleteSubscriptionInputs = {
  subscriptionId: {
    ...subscriptionId,
    comments: "The ID of the subscription to delete.",
  },
};

export const deleteAllSubscriptionsInputs = {
  notificationUrl: {
    ...notificationUrl,
    comments: "The URL from which to delete all subscriptions.",
  },
};
