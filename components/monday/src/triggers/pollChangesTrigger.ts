import { pollingTrigger } from "@prismatic-io/spectral";
import { getMondayClient } from "../client";
import { BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { MondayItem, PollingChangesObject, PollingState } from "../types";
import {
  fetchAllItemsSince,
  partitionItemsByTimestamp,
  resolvePollingRecordChanges,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Items",
    description:
      "Retrieves existing and ongoing items for a specified Monday.com board. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }) =>
      resolvePollingRecordChanges(
        payload.body.data as PollingChangesObject | undefined,
      ),
  },
  perform: async (
    context,
    payload,
    { connection, boardId, lookBackDate, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date();
    const lastState = context.polling.getState() as PollingState | undefined;
    const sinceDate = lastState?.lastPolledAt
      ? new Date(lastState.lastPolledAt)
      : lookBackDate
        ? new Date(`${lookBackDate}T00:00:00.000Z`)
        : now;
    const client = getMondayClient(
      connection,
      context.debug.enabled,
      context.logger,
    );
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
