import { trigger } from "@prismatic-io/spectral";
import { workflowTriggerExamplePayload } from "../examplePayloads";
import { workflowTriggerInputs } from "../inputs";
import {
  onInstanceDeleteFunction,
  onInstanceDeployFunction,
  performTriggerFunction,
} from "../util";

export const workflowTrigger = trigger({
  display: {
    label: "Workflow Outbound Message Webhook (Deprecated)",
    description:
      "Receive workflow rule outbound messages from Salesforce. Automatically creates and manages a workflow rule and outbound message when the instance is deployed, and removes them when the instance is deleted.",
  },
  perform: performTriggerFunction,
  inputs: workflowTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  webhookLifecycleHandlers: {
    create: onInstanceDeployFunction,
    delete: onInstanceDeleteFunction,
  },
  examplePayload: workflowTriggerExamplePayload,
});
