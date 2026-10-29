import { trigger } from "@prismatic-io/spectral";
import { incidentsTriggerExamplePayload } from "../examplePayloads";
import {
  connectionInput,
  filterId,
  filterType,
  incidentEventsInput,
  webhookDescription,
} from "../inputs";
import { onInstanceDelete } from "../util/onInstanceDelete";
import { onInstanceDeploy } from "../util/onInstanceDeploy";
import { perform } from "../util/perform";

export const incidentsTrigger = trigger({
  display: {
    label: "Incident Webhook",
    description:
      "Receive incident webhook notifications from PagerDuty when a selected incident event occurs.",
  },
  perform,
  onInstanceDeploy,
  onInstanceDelete,
  inputs: {
    connection: connectionInput,
    events: incidentEventsInput,
    webhookDescription,
    filterId,
    filterType,
  },
  examplePayload: incidentsTriggerExamplePayload,
  scheduleSupport: "invalid",
  synchronousResponseSupport: "invalid",
  allowsBranching: false,
});
