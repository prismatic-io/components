import { trigger } from "@prismatic-io/spectral";
import { webhookExamplePayload } from "../examplePayloads";
export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receives webhook requests from SendGrid for manually configured webhook subscriptions.",
  },
  perform: async (_context, payload) => {
    return Promise.resolve({
      payload,
    });
  },
  inputs: {},
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: webhookExamplePayload,
});
