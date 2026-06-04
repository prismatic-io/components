import { trigger } from "@prismatic-io/spectral";
import { webhookExamplePayload } from "../examplePayloads";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description: "Receive and validate webhook requests from ClickUp for manually configured webhook subscriptions.",
  },
  examplePayload: webhookExamplePayload,
  perform: async (_context, payload) => {
    return Promise.resolve({
      payload,
    });
  },
  inputs: {},
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
