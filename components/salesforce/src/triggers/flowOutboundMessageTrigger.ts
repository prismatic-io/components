import { trigger } from "@prismatic-io/spectral";
import {
  onInstanceDeleteFlowFunction,
  onInstanceDeployFlowFunction,
} from "../helpers";
import { flowOutboundMessageTriggerExamplePayload } from "../examplePayloads";
import { flowOutboundMessageTriggerInputs } from "../inputs";
import { performFlowOutboundMessageTriggerFunction } from "../util";

export const flowOutboundMessageTrigger = trigger({
  display: {
    label: "Flow Outbound Message Webhook",
    description:
      "Receive Flow-based outbound messages from Salesforce. Automatically creates and manages a record-triggered flow and outbound message when the instance is deployed, and removes them when the instance is deleted.",
  },
  perform: performFlowOutboundMessageTriggerFunction,
  inputs: flowOutboundMessageTriggerInputs,
  synchronousResponseSupport: "invalid",
  webhookLifecycleHandlers: {
    create: onInstanceDeployFlowFunction,
    delete: onInstanceDeleteFlowFunction,
  },
  scheduleSupport: "invalid",
  examplePayload: flowOutboundMessageTriggerExamplePayload,
});
