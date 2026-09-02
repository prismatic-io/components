import { pollingTrigger } from "@prismatic-io/spectral";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesTriggerInputs } from "../inputs";
import type { PollChangesParams } from "../types";
import {
  performPollChanges,
  pollChangesBatchConfig,
  pollChangesResolver,
} from "./pollChanges";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a specified HubSpot object type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesTriggerInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: pollChangesBatchConfig,
  triggerResolver: pollChangesResolver,
  perform: async (context, payload, params) =>
    performPollChanges(
      context as never,
      payload as never,
      params as PollChangesParams,
      {
        onlyCustomObjects: false,
      },
    ),
});
