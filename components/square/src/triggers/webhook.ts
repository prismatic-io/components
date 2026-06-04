import { trigger } from "@prismatic-io/spectral";
import { squareWebhookTriggerExamplePayload } from "../examplePayloads";
import { squareWebhookTriggerInputs } from "../inputs";

export const squareWebhookTrigger = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Square for manually configured webhook subscriptions.",
  },
  perform: async (_context, payload) => {
    

    return Promise.resolve({
      payload,
      response: { statusCode: 200, contentType: "application/json" },
      branch: "Notification",
    });
  },
  inputs: squareWebhookTriggerInputs,
  examplePayload: squareWebhookTriggerExamplePayload,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
