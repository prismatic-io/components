import { pollingTrigger } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { DEFAULT_BATCH_SIZE, MAX_BATCHED_PAGE_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesTriggerInputs } from "../inputs";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import {
  fetchTasksSince,
  partitionTasksByTimestamp,
  planBatchedPoll,
  resolvePollingRecordChanges,
  resolvePollWindow,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Tasks",
    description:
      "Retrieves existing and ongoing tasks for a specified Asana project. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesTriggerInputs,
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
      asanaConnection,
      projectId,
      lookBackDate,
      showNewRecords,
      showUpdatedRecords,
    },
  ) => {
    const now = new Date();
    const lastState = context.polling.getState() as PollingState | undefined;
    const { sinceDate, isBackfill } = resolvePollWindow(
      lastState,
      lookBackDate,
      now,
    );
    const client = await createAsanaClient(
      asanaConnection,
      context.debug.enabled,
    );
    const tasks = await fetchTasksSince(
      client,
      projectId,
      sinceDate.toISOString(),
    );
    const poll =
      context.batch?.enabled === true
        ? planBatchedPoll(
            tasks,
            sinceDate,
            lastState?.lastSeenIds,
            MAX_BATCHED_PAGE_SIZE,
          )
        : {
            ...partitionTasksByTimestamp(tasks, sinceDate),
            nextState: { lastPolledAt: now.toISOString() },
            complete: true,
          };
    context.polling.setState({
      ...poll.nextState,
      ...(isBackfill && !poll.complete ? { isBackfill: true } : {}),
    });
    const { created, updated } = poll;
    const result = {
      created: isBackfill || showNewRecords ? created : [],
      updated: isBackfill || showUpdatedRecords ? updated : [],
    };
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled project ${projectId}: ${tasks.length} total → ${created.length} new, ${updated.length} updated`,
      );
    }
    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges:
        result.created.length === 0 && result.updated.length === 0,
    };
  },
});
