import { pollingTrigger } from "@prismatic-io/spectral";
import { createOdooClient } from "../client";
import { DEFAULT_BATCH_SIZE, MAX_POLL_PAGES } from "../constants";
import { pollChangesExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import {
  createOdooAwaitClient,
  fetchOdooPageLegacy,
  isLegacyConnection,
} from "../legacy";
import type {
  FetchPollPage,
  PollCursor,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import {
  drainWatermark,
  fetchOdooPage,
  nextPollingState,
  resolvePollingRecordChanges,
  resolvePollWindow,
  resolveSafeHorizon,
  resolveStartCursor,
  splitPolledRecords,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a specified Odoo model. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: pollChangesExamplePayload,
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
    getNextPaginationState: (_context, { payload }): PollCursor | null =>
      (payload.paginationState as PollCursor | undefined) ?? null,
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState | undefined;
    const incoming = payload.paginationState as PollCursor | undefined;
    const window = resolvePollWindow(state, params.lookBackDate, now);
    let fetchPage: FetchPollPage;
    if (isLegacyConnection(params.connection)) {
      const client = await createOdooAwaitClient(params.connection);
      fetchPage = fetchOdooPageLegacy(client, params.model);
    } else {
      const client = createOdooClient(params.connection, context.debug.enabled);
      fetchPage = fetchOdooPage(client, params.model);
    }
    const result = await drainWatermark(
      fetchPage,
      resolveStartCursor(state, incoming, window),
      resolveSafeHorizon(now),
      context.batch?.enabled === true ? 1 : MAX_POLL_PAGES,
    );
    const data = splitPolledRecords(result.records, window, {
      showNew: params.showNewRecords,
      showUpdated: params.showUpdatedRecords,
    });
    context.polling.setState(nextPollingState(state, window, result));
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Odoo ${params.model}: ${result.records.length} fetched, ${data.created.length} created, ${data.updated.length} updated, drained=${result.drained}`,
      );
    }
    return {
      payload: {
        ...payload,
        paginationState: result.drained ? undefined : result.cursor,
        body: { data },
      },
      polledNoChanges:
        result.drained &&
        !incoming &&
        data.created.length + data.updated.length === 0,
    };
  },
});
