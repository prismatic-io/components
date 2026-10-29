import { pollingTrigger } from "@prismatic-io/spectral";
import { createGitlabClient } from "../client";
import {
  DEFAULT_BATCH_SIZE,
  MAX_BATCHED_PAGE_SIZE,
  MAX_BATCHED_PAYLOAD_BYTES,
  MAX_UNBATCHED_RECORDS,
} from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import {
  fetchRecordsSince,
  planPoll,
  resolvePollingRecordChanges,
  resolvePollWindow,
} from "../utils";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing issues or merge requests for a specified GitLab project. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  perform: async (
    context,
    payload,
    {
      connection,
      project,
      pollResourceType,
      lookBackDate,
      showNewRecords,
      showUpdatedRecords,
    },
  ) => {
    const lastState = context.polling.getState() as PollingState | undefined;
    const { sinceDate, isBackfill } = resolvePollWindow(
      lastState,
      lookBackDate,
      new Date(),
    );
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const isBatching = context.batch?.enabled === true;
    const maxRecords = isBatching
      ? MAX_BATCHED_PAGE_SIZE
      : MAX_UNBATCHED_RECORDS;
    const maxBytes = isBatching
      ? MAX_BATCHED_PAYLOAD_BYTES
      : Number.POSITIVE_INFINITY;
    const seenIds = lastState?.lastSeenIds ?? [];
    const records = await fetchRecordsSince(
      client,
      project,
      pollResourceType,
      sinceDate,
      seenIds,
      maxRecords,
    );
    const poll = planPoll(records, sinceDate, seenIds, maxRecords, maxBytes);

    context.polling.setState({
      ...poll.nextState,
      ...(isBackfill && !poll.complete ? { isBackfill: true } : {}),
    });

    const result = {
      created: isBackfill || showNewRecords ? poll.created : [],
      updated: isBackfill || showUpdatedRecords ? poll.updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${pollResourceType} in project ${project}: ${records.length} fetched, ${result.created.length} new, ${result.updated.length} updated`,
      );
    }

    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges:
        result.created.length === 0 && result.updated.length === 0,
    };
  },
});
