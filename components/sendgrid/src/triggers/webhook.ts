import { trigger } from "@prismatic-io/spectral";
import { webhookTriggerExamplePayload } from "../examplePayloads";
export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receives and validates webhook requests from SendGrid for manually configured webhook subscriptions.",
  },
  perform: async (_context, payload) => {
    return Promise.resolve({
      payload,
    });
  },
  inputs: {},
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: webhookTriggerExamplePayload,
});
