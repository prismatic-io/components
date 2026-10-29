import { trigger } from "@prismatic-io/spectral";
import { manualWebhookExamplePayload } from "../examplePayloads";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive webhook requests from Mailchimp for manually configured webhooks. Use this trigger when you want to configure webhooks directly in Mailchimp rather than having them auto-managed.",
  },
  inputs: {},
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: async (_context, payload, _inputs) => {
    return Promise.resolve({ payload });
  },
  examplePayload: manualWebhookExamplePayload,
});
