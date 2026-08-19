import { pollingTrigger } from "@prismatic-io/spectral";
import {
  connectionInput,
  lookBackDate,
  objectType,
  searchProperties,
  showNewRecords,
  showUpdatedRecords,
} from "../inputs";
import type { PollChangesParams } from "../types/polling";
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
  inputs: {
    lookBackDate,
    showNewRecords,
    showUpdatedRecords,
    hubspotConnection: connectionInput,
    objectType: {
      ...objectType,
      comments: "The type of custom object to search for.",
    },
    searchProperties,
  },
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
