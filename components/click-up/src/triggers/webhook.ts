import { trigger } from "@prismatic-io/spectral";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookInputs } from "../inputs";
export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from ClickUp for manually configured webhook subscriptions.",
  },
  examplePayload: webhookExamplePayload,
  perform: async (_context, payload) => {
    return Promise.resolve({
      payload,
    });
  },
  inputs: webhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
