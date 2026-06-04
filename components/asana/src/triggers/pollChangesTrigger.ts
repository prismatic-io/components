import { pollingTrigger } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import {
  connectionInput,
  projectId,
  showNewRecords,
  showUpdatedRecords,
} from "../inputs";
import type { PollingState } from "../types/PollingState";
import { fetchTasksSince, partitionTasksByTimestamp } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Tasks",
    description:
      "Checks for new and updated tasks in a selected Asana project on a configured schedule.",
  },
  inputs: {
    asanaConnection: connectionInput,
    projectId,
    showNewRecords,
    showUpdatedRecords,
  },
  examplePayload: pollChangesTriggerExamplePayload,
  perform: async (
    context,
    payload,
    { asanaConnection, projectId, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date();
    const lastState = context.polling.getState() as PollingState | undefined;
    const sinceDate = lastState?.lastPolledAt
      ? new Date(lastState.lastPolledAt)
      : now;

    const client = await createAsanaClient(
      asanaConnection,
      context.debug.enabled,
    );
    const tasks = await fetchTasksSince(
      client,
      projectId,
      sinceDate.toISOString(),
    );

    const { created, updated } = partitionTasksByTimestamp(tasks, sinceDate);

    context.polling.setState({ lastPolledAt: now.toISOString() } as Record<
      string,
      unknown
    >);

    const result = {
      created: showNewRecords ? created : [],
      updated: showUpdatedRecords ? updated : [],
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
