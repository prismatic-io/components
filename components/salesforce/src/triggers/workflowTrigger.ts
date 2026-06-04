import { trigger } from "@prismatic-io/spectral";
import { workflowTriggerInputs } from "../inputs";
import {
  onInstanceDeleteFunction,
  onInstanceDeployFunction,
  performTriggerFunction,
} from "../util";

export const workflowTrigger = trigger({
  display: {
    label: "Workflow Outbound Message Webhook (Deprecated)",
    description: "Receive workflow rule outbound messages from Salesforce.",
  },
  perform: performTriggerFunction,
  inputs: workflowTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  webhookLifecycleHandlers: {
    create: onInstanceDeployFunction,
    delete: onInstanceDeleteFunction,
  },
});
