import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  connectionInput,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
  version,
} from "../inputs";
import type {
  PollingState,
  ShipbobOrder,
  ShipbobOrderChange,
  ShipbobOrderChanges,
} from "../types/polling";
import {
  classifyOrdersByPollDate,
  getAllPaginatedData,
  resolvePollWindow,
  resolveShipbobOrderChanges,
  toShipbobDate,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Orders",
    description:
      "Retrieves existing and ongoing orders from ShipBob. Load history once, check for changes on a schedule, or both.",
  },
  inputs: {
    connectionInput,
    version,
    lookBackDate,
    showNewRecords,
    showUpdatedRecords,
  },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): ShipbobOrderChange[] =>
      resolveShipbobOrderChanges(payload.body.data as ShipbobOrderChanges),
  },
  perform: async (context, payload, params) => {
    const pollState = context.polling.getState() as PollingState;
    const now = new Date().toISOString();
    const window = resolvePollWindow(pollState, params);
    if (!window) {
      context.polling.setState({ lastPolledAt: now });
      return {
        payload: { ...payload, body: { data: { created: [], updated: [] } } },
        polledNoChanges: true,
      };
    }
    const client = createClient(
      params.connectionInput,
      params.version,
      context.debug.enabled,
    );
    const orders = await getAllPaginatedData<ShipbobOrder>(client, "/order", {
      LastUpdateStartDate: toShipbobDate(window.since),
    });
    const { created, updated } = classifyOrdersByPollDate(
      orders,
      window.createdAfter,
    );
    const emittedCreated = window.includeNew ? created : [];
    const emittedUpdated = window.includeUpdated ? updated : [];
    const totalMatched = emittedCreated.length + emittedUpdated.length;
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ShipBob orders: ${orders.length} fetched, ${emittedCreated.length} created, ${emittedUpdated.length} updated`,
      );
    }
    return {
      payload: {
        ...payload,
        body: { data: { created: emittedCreated, updated: emittedUpdated } },
      },
      polledNoChanges: totalMatched === 0,
    };
  },
});
