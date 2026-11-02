import { trigger } from "@prismatic-io/spectral";
import { aemAssetsEventWebhookExamplePayload } from "../examplePayloads";
import { aemAssetsEventWebhookInputs } from "../inputs";
import { AEM_EVENT_BRANCHES } from "../constants";
import { aemEventLifecycleHandlers, performAemEvent } from "../utils";

const LABEL = "AEM Assets Event Subscription";

export const aemAssetsEventWebhook = trigger({
  display: {
    label: LABEL,
    description:
      "Receive and validate asset events from Adobe Experience Manager, including metadata updates that the New and Updated Assets trigger cannot detect. Handles URL verification challenges automatically, and automatically creates and manages an Adobe I/O Events webhook registration with the environment's AEM Assets event provider when the instance is deployed, removing it when the instance is deleted.",
  },
  inputs: aemAssetsEventWebhookInputs,
  scheduleSupport: "invalid",
  synchronousResponseSupport: "valid",
  allowsBranching: true,
  staticBranchNames: AEM_EVENT_BRANCHES,
  webhookLifecycleHandlers: aemEventLifecycleHandlers(LABEL),
  perform: performAemEvent,
  examplePayload: aemAssetsEventWebhookExamplePayload,
});
