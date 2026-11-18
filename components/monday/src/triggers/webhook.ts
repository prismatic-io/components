import { trigger } from "@prismatic-io/spectral";
import {
  WEBHOOK_BRANCH_CHALLENGE,
  WEBHOOK_BRANCH_NOTIFICATION,
} from "../constants";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookInputs } from "../inputs";
import { onWebhookCreate, onWebhookDelete, perform } from "../util";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive webhook events from Monday. Automatically creates and manages webhook subscriptions on instance deploy and removes them on instance delete.",
  },
  allowsBranching: true,
  staticBranchNames: [WEBHOOK_BRANCH_NOTIFICATION, WEBHOOK_BRANCH_CHALLENGE],
  perform,
  inputs: webhookInputs,
  examplePayload: webhookExamplePayload,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  webhookLifecycleHandlers: {
    create: onWebhookCreate,
    delete: onWebhookDelete,
  },
});
