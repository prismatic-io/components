import { trigger } from "@prismatic-io/spectral";
import { TriggerBranches } from "../constants";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookInputs as inputs } from "../inputs/triggers";
import { triggerPerformFunction } from "../util";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Microsoft Entra ID for manually configured webhook subscriptions.",
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "invalid",
  allowsBranching: true,
  inputs,
  staticBranchNames: [
    TriggerBranches.Notification,
    TriggerBranches.URLValidation,
  ],
  perform: triggerPerformFunction,
  examplePayload: webhookExamplePayload,
});
