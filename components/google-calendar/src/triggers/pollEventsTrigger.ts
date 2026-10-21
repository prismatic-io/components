import { pollingTrigger } from "@prismatic-io/spectral";
import { pollEventsTriggerPayload } from "../examplePayloads";
import { pollEventsTriggerPerform } from "../helpers/pollEventsTriggerPerform";
import { pollEventsTriggerInputs } from "../inputs";
import type {
  EventChangesObject,
  EventRecordChange,
  PollEventsCursor,
} from "../types";
import { resolvePollingRecordChanges } from "../utils";
export const pollEventsTrigger = pollingTrigger({
  display: {
    label: "New and Updated Events",
    description:
      "Retrieves existing and ongoing events in a specified Google Calendar. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollEventsTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): EventRecordChange[] =>
      resolvePollingRecordChanges(
        (
          payload.body.data as
            | {
                changes?: EventChangesObject;
              }
            | undefined
        )?.changes,
      ),
    getNextPaginationState: (_context, { payload }): PollEventsCursor =>
      (payload.paginationState as PollEventsCursor | undefined) ?? null,
  },
  perform: pollEventsTriggerPerform,
  examplePayload: pollEventsTriggerPayload,
});
