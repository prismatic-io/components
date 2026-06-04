import { trigger } from "@prismatic-io/spectral";
import { webhookTriggerExamplePayload } from "../examplePayloads";
import { createWebhookPerformFN } from "../util";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Outlook for manually configured webhook subscriptions.",
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "valid",
  allowsBranching: true,
  inputs: {},
  staticBranchNames: ["Notification", "URL Validation"],
  perform: createWebhookPerformFN(),
  examplePayload: webhookTriggerExamplePayload,
});
