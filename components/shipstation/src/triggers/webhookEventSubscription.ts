import { trigger } from "@prismatic-io/spectral";
import { webhookEventSubscriptionInputs } from "../inputs";
import {
  createWebhookSubscription,
  deleteWebhookSubscription,
  webhookPerformFN,
} from "./utils";

export const webhookEventSubscription = trigger({
  display: {
    label: "Webhook Event Subscription",
    description:
      "Receive webhook event notifications from ShipStation. Automatically creates and manages a webhook subscription for the selected event type when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  inputs: webhookEventSubscriptionInputs,
  perform: webhookPerformFN,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  webhookLifecycleHandlers: {
    create: createWebhookSubscription,
    delete: deleteWebhookSubscription,
  },
});
