import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_BATCH_SIZE, MAX_BATCHED_RECORDS } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesTriggerInputs } from "../inputs";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../interfaces/PollingState";
import {
  fetchIssuesSince,
  floorToSecond,
  nextPollingState,
  resolvePollingRecordChanges,
  splitIssueChanges,
} from "../utils";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing issues (including pull requests) for a specified GitHub repository. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  perform: async (context, payload, params) => {
    const pollState = context.polling.getState() as PollingState;
    const isBatching = context.batch?.enabled === true;
    const lastPolledAt = floorToSecond(
      pollState?.lastPolledAt ||
        params.lookBackDate ||
        new Date().toISOString(),
    );
    const isInitialSync =
      pollState?.backfillActive === true ||
      (!pollState?.lastPolledAt && Boolean(params.lookBackDate));
    const client = createClient(params.connection, context.debug.enabled);
    const { issues, stalled } = await fetchIssuesSince(
      client,
      `/repos/${params.owner}/${params.repo}/issues`,
      lastPolledAt,
      isBatching,
    );
    const { created, updated } = splitIssueChanges(
      issues,
      lastPolledAt,
      pollState?.lastSeenIds,
    );
    const filteredCreated =
      isInitialSync || params.showNewRecords !== false ? created : [];
    const filteredUpdated =
      isInitialSync || params.showUpdatedRecords !== false ? updated : [];
    const capped =
      isBatching && !stalled && issues.length >= MAX_BATCHED_RECORDS;
    context.polling.setState(
      nextPollingState(
        pollState,
        issues,
        [...filteredCreated, ...filteredUpdated],
        lastPolledAt,
        isInitialSync && capped,
      ),
    );
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled GitHub ${params.owner}/${params.repo} issues: ${issues.length} fetched, ${filteredCreated.length} created, ${filteredUpdated.length} updated`,
      );
    }
    return {
      payload: {
        ...payload,
        body: { data: { created: filteredCreated, updated: filteredUpdated } },
      },
      polledNoChanges: filteredCreated.length + filteredUpdated.length === 0,
    };
  },
});
