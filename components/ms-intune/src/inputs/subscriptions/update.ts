import { expirationDateTime, notificationUrl, subscriptionId } from "./general";

export const updateSubscriptionInputs = {
  subscriptionId: {
    ...subscriptionId,
    comments: "The ID of the subscription to update.",
  },
  notificationUrl: {
    ...notificationUrl,
    required: false,
  },
  expirationDateTime: {
    ...expirationDateTime,
    required: false,
  },
};
