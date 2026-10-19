import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_BATCH_SIZE, MAX_POLL_PAGES } from "../constants";
import { pollComputersInputs } from "../inputs";
import type {
  ComputerPollCursor,
  ComputerPollingState,
  NewComputerChange,
  NewComputersChanges,
} from "../types";
import {
  drainWatermark,
  fetchComputerPage,
  nextPollingState,
  resolveNewComputerChanges,
  resolveSafeHorizon,
  resolveStartCursor,
} from "../util";
export const pollNewComputers = pollingTrigger({
  display: {
    label: "New Computers",
    description:
      "Retrieves existing and newly enrolled computers in Jamf Pro. Load history once, check for new enrollments on a schedule, or both.",
  },
  inputs: pollComputersInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): NewComputerChange[] =>
      resolveNewComputerChanges(payload.body.data as NewComputersChanges),
    getNextPaginationState: (
      _context,
      { payload },
    ): ComputerPollCursor | null =>
      (payload.paginationState as ComputerPollCursor | undefined) ?? null,
  },
  perform: async (context, payload, { connection, lookBackDate }) => {
    const now = new Date().toISOString();
    const state = (context.polling.getState() ?? {}) as ComputerPollingState;
    const incoming = payload.paginationState as ComputerPollCursor | undefined;
    const seed = lookBackDate || now;
    const client = await createClient(connection, context.debug.enabled);
    const result = await drainWatermark(
      fetchComputerPage(client),
      resolveStartCursor(state, incoming, seed),
      resolveSafeHorizon(now),
      context.batch?.enabled === true ? 1 : MAX_POLL_PAGES,
    );
    context.polling.setState(nextPollingState(state, seed, result));
    context.logger.debug(
      `Polled ${result.delivered.length} computers, drained=${result.drained}`,
    );
    return {
      payload: {
        ...payload,
        paginationState: result.drained ? undefined : result.cursor,
        body: { data: result.delivered },
      },
      polledNoChanges:
        result.drained && !incoming && result.delivered.length === 0,
    };
  },
});
