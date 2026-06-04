import { pollingTrigger } from "@prismatic-io/spectral";
import { createClickUpClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { fetchTasksSince, formatClickUpTimestamp, partitionTasksByTimestamp } from "../helpers";
import { connectionInput, pollScopeId, pollScopeType, showNewRecords, showUpdatedRecords } from "../inputs";
import type { PollingState } from "../types";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Tasks",
    description: "Checks for new and updated tasks in ClickUp on a configured schedule.",
  },
  inputs: {
    connection: connectionInput,
    scopeType: pollScopeType,
    scopeId: pollScopeId,
    showNewRecords,
    showUpdatedRecords,
  },
  examplePayload: pollChangesTriggerExamplePayload,
  perform: async (context, payload, { connection, scopeType, scopeId, showNewRecords, showUpdatedRecords }) => {
    const now = new Date();
    const lastState = context.polling.getState() as PollingState | undefined;
    const sinceDate = lastState?.lastPolledAt ? new Date(lastState.lastPolledAt) : now;
    const sinceMs = sinceDate.getTime();

    const client = createClickUpClient(connection, context.debug.enabled);
    const tasks = await fetchTasksSince(
      client,
      scopeType as "team" | "list",
      scopeId,
      formatClickUpTimestamp(sinceDate)
    );

    const { created, updated } = partitionTasksByTimestamp(tasks, sinceMs);

    context.polling.setState({ lastPolledAt: now.toISOString() } as Record<string, unknown>);

    const result = {
      created: showNewRecords ? created : [],
      updated: showUpdatedRecords ? updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${scopeType} ${scopeId}: ${tasks.length} total → ${created.length} new, ${updated.length} updated`
      );
    }

    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges: result.created.length === 0 && result.updated.length === 0,
    };
  },
});
