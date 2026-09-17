import { trigger } from "@prismatic-io/spectral";
import { pushNotificationWebhookExamplePayload } from "../examplePayloads";
import { pushNotificationWebhookInputs } from "../inputs";
export const pushNotificationWebhook = trigger({
  display: {
    label: "Push Notification Webhook",
    description:
      "Receive and validate webhook requests from Google Drive for webhooks you configure.",
  },
  perform: async (_context, payload) => {
    return Promise.resolve({ payload });
  },
  inputs: pushNotificationWebhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: { ...pushNotificationWebhookExamplePayload },
});
