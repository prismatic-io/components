import { trigger } from "@prismatic-io/spectral";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookTriggerInputs } from "../inputs";
import { onWebhookCreate, onWebhookDelete } from "../util/webhookLifecycle";
import { perform } from "../util/webhookPerform";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive webhook events from Monday. Automatically creates and manages webhook subscriptions on instance deploy and removes them on instance delete.",
  },
  allowsBranching: true,
  staticBranchNames: ["Notification", "Challenge Verification"],
  perform,
  inputs: webhookTriggerInputs,
  examplePayload: webhookExamplePayload,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  webhookLifecycleHandlers: {
    create: onWebhookCreate,
    delete: onWebhookDelete,
  },
});
