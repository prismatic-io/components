import { pollingTrigger } from "@prismatic-io/spectral";
import { createClickUpClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesTriggerInputs } from "../inputs";
import type {
  ClickUpTaskChange,
  ClickUpTaskChangesObject,
  PollingState,
  PollScopeType,
} from "../types";
import {
  fetchTasksSince,
  formatClickUpTimestamp,
  partitionTasksByTimestamp,
  resolveClickUpTaskChanges,
  resolvePollingWindowStart,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Tasks",
    description:
      "Retrieves existing and ongoing tasks for a specified ClickUp workspace or list. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): ClickUpTaskChange[] =>
      resolveClickUpTaskChanges(payload.body.data as ClickUpTaskChangesObject),
  },
  examplePayload: pollChangesTriggerExamplePayload,
  perform: async (
    context,
    payload,
    {
      connection,
      scopeType,
      scopeId,
      lookBackDate,
      showNewRecords,
      showUpdatedRecords,
    },
  ) => {
    const now = new Date();
    const lastState = context.polling.getState() as PollingState | undefined;
    const { sinceMs, isInitialSync } = resolvePollingWindowStart(
      lastState,
      lookBackDate,
      now,
    );
    const client = createClickUpClient(connection, context.debug.enabled);
    const tasks = await fetchTasksSince(
      client,
      scopeType as PollScopeType,
      scopeId,
      formatClickUpTimestamp(new Date(sinceMs)),
    );
    const { created, updated } = partitionTasksByTimestamp(tasks, sinceMs);
    context.polling.setState({ lastPolledAt: now.toISOString() } as Record<
      string,
      unknown
    >);
    const result: ClickUpTaskChangesObject = {
      created: showNewRecords || isInitialSync ? created : [],
      updated: showUpdatedRecords || isInitialSync ? updated : [],
    };
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${scopeType} ${scopeId}${isInitialSync ? " (initial sync)" : ""}: ${tasks.length} total → ${created.length} new, ${updated.length} updated`,
      );
    }
    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges:
        result.created.length === 0 && result.updated.length === 0,
    };
  },
});
