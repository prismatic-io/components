import { pollingTrigger } from "@prismatic-io/spectral";
import { pollChangesCustomObjectsTriggerExamplePayload } from "../examplePayloads";
import { pollChangesCustomObjectsTriggerInputs } from "../inputs";
import type { PollChangesParams } from "../types";
import {
  performPollChanges,
  pollChangesBatchConfig,
  pollChangesResolver,
} from "./pollChanges";
export const pollChangesCustomObjectsTrigger = pollingTrigger({
  display: {
    label: "New and Updated Custom Records",
    description:
      "Retrieves existing and ongoing records for a specified HubSpot custom object type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesCustomObjectsTriggerInputs,
  examplePayload: pollChangesCustomObjectsTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: pollChangesBatchConfig,
  triggerResolver: pollChangesResolver,
  perform: async (context, payload, params) =>
    performPollChanges(
      context as never,
      payload as never,
      params as PollChangesParams,
      {
        onlyCustomObjects: true,
      },
    ),
});
