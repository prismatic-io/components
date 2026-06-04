import { pollingTrigger } from "@prismatic-io/spectral";
import { rawHttpClient } from "../auth";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { connectionInput, showNewRecords, showUpdatedRecords } from "../inputs";
import type { PollingState } from "../types";
import { drainTicketsStream, partitionTicketsByTimestamp } from "../util";




const ONE_MINUTE_SECONDS = 60;

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Tickets",
    description:
      "Checks for new and updated tickets in Zendesk on a configured schedule.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: {
    connection: connectionInput,
    showNewRecords,
    showUpdatedRecords,
  },
  perform: async (
    context,
    payload,
    { connection, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date();
    const lastState = context.polling.getState() as PollingState | undefined;
    const startTime = Math.floor(now.getTime() / 1000) - ONE_MINUTE_SECONDS;
    const sinceDate = lastState?.lastPolledAt
      ? new Date(lastState.lastPolledAt)
      : now;

    const client = rawHttpClient(connection, context.debug.enabled);
    const { tickets, afterCursor } = await drainTicketsStream(
      client,
      lastState?.afterCursor,
      startTime,
    );

    const { created, updated } = partitionTicketsByTimestamp(
      tickets,
      sinceDate,
    );

    context.polling.setState({
      afterCursor,
      lastPolledAt: now.toISOString(),
    } as Record<string, unknown>);

    const result = {
      created: showNewRecords ? created : [],
      updated: showUpdatedRecords ? updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled tickets: ${tickets.length} drained → ${created.length} new, ${updated.length} updated`,
      );
    }

    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges:
        result.created.length === 0 && result.updated.length === 0,
    };
  },
});
