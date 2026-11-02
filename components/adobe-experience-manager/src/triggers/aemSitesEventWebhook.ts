import { trigger } from "@prismatic-io/spectral";
import { aemSitesEventWebhookExamplePayload } from "../examplePayloads";
import { aemSitesEventWebhookInputs } from "../inputs";
import { AEM_EVENT_BRANCHES } from "../constants";
import { aemEventLifecycleHandlers, performAemEvent } from "../utils";

const LABEL = "AEM Sites Event Subscription";

export const aemSitesEventWebhook = trigger({
  display: {
    label: LABEL,
    description:
      "Receive and validate content fragment and page events from Adobe Experience Manager. Handles URL verification challenges automatically, and automatically creates and manages an Adobe I/O Events webhook registration with the environment's AEM Sites event provider when the instance is deployed, removing it when the instance is deleted. With a Publish Base URL, page events carry the published page URL for Get Published Page HTML.",
  },
  inputs: aemSitesEventWebhookInputs,
  scheduleSupport: "invalid",
  synchronousResponseSupport: "valid",
  allowsBranching: true,
  staticBranchNames: AEM_EVENT_BRANCHES,
  webhookLifecycleHandlers: aemEventLifecycleHandlers(LABEL),
  perform: performAemEvent,
  examplePayload: aemSitesEventWebhookExamplePayload,
});
