import { trigger } from "@prismatic-io/spectral";
import { onInstanceDeleteFlowFunction, onInstanceDeployFlowFunction } from "../helpers";
import { flowOutboundMessageTriggerInputs } from "../inputs";
import { performFlowOutboundMessageTriggerFunction } from "../util";

export const flowOutboundMessageTrigger = trigger({
  display: {
    label: "Flow Outbound Message Webhook",
    description: "Receive Flow-based outbound messages from Salesforce.",
  },
  perform: performFlowOutboundMessageTriggerFunction,
  inputs: flowOutboundMessageTriggerInputs,
  synchronousResponseSupport: "invalid",
  webhookLifecycleHandlers: {
    create: onInstanceDeployFlowFunction,
    delete: onInstanceDeleteFlowFunction,
  },
  scheduleSupport: "invalid",
});
