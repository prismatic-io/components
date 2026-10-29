import { trigger } from "@prismatic-io/spectral";
import { serviceTriggerExamplePayload } from "../examplePayloads";
import {
  connectionInput,
  filterId,
  filterType,
  serviceEventsInput,
  webhookDescription,
} from "../inputs";
import { onInstanceDelete } from "../util/onInstanceDelete";
import { onInstanceDeploy } from "../util/onInstanceDeploy";
import { perform } from "../util/perform";

export const serviceTrigger = trigger({
  display: {
    label: "Service Webhook",
    description:
      "Receive service webhook notifications from PagerDuty when a selected service event occurs.",
  },
  perform,
  onInstanceDeploy,
  onInstanceDelete,
  inputs: {
    connection: connectionInput,
    events: serviceEventsInput,
    webhookDescription,
    filterId,
    filterType,
  },
  examplePayload: serviceTriggerExamplePayload,
  scheduleSupport: "invalid",
  synchronousResponseSupport: "invalid",
  allowsBranching: false,
});
