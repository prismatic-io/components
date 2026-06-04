import { trigger } from "@prismatic-io/spectral";
import { webhookPayload } from "../examplePayloads";
import { connectionInput } from "../inputs";
import { triggerWebhookPerformFunction } from "../util";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from HubSpot for manually configured webhook subscriptions.",
  },
  perform: triggerWebhookPerformFunction,
  inputs: {
    hubspotConnection: connectionInput,
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: webhookPayload,
});
