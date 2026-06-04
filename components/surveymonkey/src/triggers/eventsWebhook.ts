import { trigger } from "@prismatic-io/spectral";
import { eventsWebhookInputs } from "../inputs";
import {
  eventsWebhookCreate,
  eventsWebhookDelete,
  eventsWebhookPerform,
} from "../util";
import { eventsWebhookExamplePayload } from "../examplePayloads";












export const eventsWebhook = trigger({
  display: {
    label: "Webhook Events",
    description:
      "Receive real-time notifications for SurveyMonkey events. Automatically creates and manages a webhook subscription when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  allowsBranching: false,
  inputs: eventsWebhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: eventsWebhookPerform,
  webhookLifecycleHandlers: {
    create: eventsWebhookCreate,
    delete: eventsWebhookDelete,
  },
  examplePayload: eventsWebhookExamplePayload,
});
