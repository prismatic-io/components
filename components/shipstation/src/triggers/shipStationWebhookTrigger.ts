import { trigger } from "@prismatic-io/spectral";
import { shipStationWebhookTriggerInputs } from "../inputs";
import { webhookPerformFN } from "./utils";

export const shipStationWebhookTrigger = trigger({
  display: {
    label: "Manual Webhook",
    description:
      "Receive and validate webhook requests from ShipStation for manually configured webhook subscriptions.",
  },
  perform: webhookPerformFN,
  inputs: shipStationWebhookTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
