import { pollingTrigger } from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollingTriggerInputs } from "../inputs";
import type {
  OrderPollCursor,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import {
  classifyWatermarkRecords,
  drainWatermark,
  fetchOrdersPage,
  nextPollingState,
  pagesPerRound,
  resolveSafeHorizon,
  resolveStartCursor,
  resolveWatermarkWindow,
} from "../util";
import { hasChanges, resolvePollingRecordChanges } from "./pollingUtils";
export const pollOrders = pollingTrigger({
  display: {
    label: "New and Updated Orders",
    description:
      "Retrieves existing and ongoing orders for a specified ShipStation account. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollingTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
    getNextPaginationState: (_context, { payload }): OrderPollCursor | null =>
      (payload.paginationState as OrderPollCursor | undefined) ?? null,
  },
  perform: async (context, payload, { connection, lookBackDate }) => {
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState | null;
    const incoming = payload.paginationState as OrderPollCursor | undefined;
    const window = resolveWatermarkWindow(state, lookBackDate, now);
    const result = await drainWatermark(
      "pollOrders",
      fetchOrdersPage(createShipStationClient(connection)),
      resolveStartCursor(state, incoming, window),
      resolveSafeHorizon(now),
      pagesPerRound(context.batch?.enabled === true),
    );
    const data = classifyWatermarkRecords(result.records, window);
    context.polling.setState(nextPollingState(state, window, result));
    return {
      payload: {
        ...payload,
        paginationState: result.drained ? undefined : result.cursor,
        body: { data, polledNoChanges: false },
      },
      polledNoChanges: result.drained && !incoming && !hasChanges(data),
    };
  },
});
