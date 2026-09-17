import { pollingTrigger } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../client";
import {
  DEFAULT_BACKFILL_WINDOW_DAYS,
  MAX_POLL_PAGES_PER_RUN,
} from "../constants";
import { pollNewAndUpdatedTicketsTriggerExamplePayload } from "../examplePayloads";
import { pollNewAndUpdatedTriggerInputs as inputs } from "../inputs";
import type { PollingState, TicketPaginationState } from "../types";
import {
  relayPaginationState,
  resolveItems,
  runTicketSyncRound,
} from "../util";
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
export const pollNewAndUpdatedTicketsTrigger = pollingTrigger({
  display: {
    label: "New and Updated Tickets",
    description:
      "Retrieves existing and ongoing tickets from Freshservice. Load history once, check for changes on a schedule, or both.",
  },
  inputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems,
    getNextPaginationState: relayPaginationState,
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const windowStart =
      pollState.lastPolledAt ||
      params.lookBackDate ||
      new Date(
        Date.now() - DEFAULT_BACKFILL_WINDOW_DAYS * MILLISECONDS_PER_DAY,
      ).toISOString();
    const client = createFreshserviceClient(params.connection, {
      debug: context.debug.enabled,
    });
    const incoming =
      (payload.paginationState as TicketPaginationState | undefined) ??
      pollState.inFlightCursor;
    const round = await runTicketSyncRound(client, {
      incoming,
      windowStart,
      now,
      maxPages: MAX_POLL_PAGES_PER_RUN,
      showNewRecords: params.showNewRecords,
      showUpdatedRecords: params.showUpdatedRecords,
    });
    context.logger.debug(
      `Polling Freshservice tickets from ${round.state.windowStart}, page ${round.state.page}`,
    );
    if (round.cappedOut) {
      context.logger.error(
        `Freshservice ticket poll stopped at its ${round.state.maxPages} page limit with more pages outstanding. The cursor was left at ${round.state.windowStart}, so the outstanding pages are retried on the next poll and records already sent this run are sent again. Raise the page limit or shorten the polling interval.`,
      );
    }
    context.polling.setState(
      round.commitCursor
        ? ({ lastPolledAt: round.commitCursor } satisfies PollingState)
        : ({
            lastPolledAt: pollState.lastPolledAt,
            ...(round.nextState ? { inFlightCursor: round.nextState } : {}),
          } satisfies PollingState),
    );
    return {
      payload: {
        ...payload,
        body: { data: round.changes },
        paginationState: round.nextState ?? undefined,
      },
      polledNoChanges:
        round.changes.created.length + round.changes.updated.length === 0,
    };
  },
  examplePayload: pollNewAndUpdatedTicketsTriggerExamplePayload,
});
