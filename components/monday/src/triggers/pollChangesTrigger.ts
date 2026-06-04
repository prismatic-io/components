import { pollingTrigger } from "@prismatic-io/spectral";
import { getMondayClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { MondayItem, PollingState } from "../types/PollingState";
import { fetchAllItemsSince, partitionItemsByTimestamp } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Items",
    description:
      "Polls a Monday.com board for items created or updated since the last execution, separated into new and updated buckets.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  perform: async (
    context,
    payload,
    { connection, boardId, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date();
    const lastState = context.polling.getState() as PollingState | undefined;
    const sinceDate = lastState?.lastPolledAt
      ? new Date(lastState.lastPolledAt)
      : now;

    const client = getMondayClient(connection, context.debug.enabled);
    const items: MondayItem[] = await fetchAllItemsSince(
      client,
      boardId,
      sinceDate.toISOString(),
    );

    const { created, updated } = partitionItemsByTimestamp(items, sinceDate);

    context.polling.setState({
      lastPolledAt: now.toISOString(),
    } as Record<string, unknown>);

    const result = {
      created: showNewRecords ? created : [],
      updated: showUpdatedRecords ? updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled board ${boardId}: ${items.length} total → ${created.length} new, ${updated.length} updated`,
      );
    }

    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges:
        result.created.length === 0 && result.updated.length === 0,
    };
  },
});
