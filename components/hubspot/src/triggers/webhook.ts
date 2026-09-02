import { trigger } from "@prismatic-io/spectral";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookTriggerInputs } from "../inputs";
import { triggerWebhookPerformFunction } from "../util";
export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from HubSpot for manually configured webhook subscriptions.",
  },
  perform: triggerWebhookPerformFunction,
  inputs: webhookTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: webhookExamplePayload,
});
