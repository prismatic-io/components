import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  BACKFILL_COMPLETED_KEY,
  BACKFILL_CURSOR_KEY,
  BATCH_SIZE,
  DEFAULT_BACKFILL_MAX_PAGES,
  MAX_BATCHED_PAGES_PER_RUN,
  MAX_POLL_PAGES_PER_RUN,
} from "../constants";
import { dataSourceItemsPollingTriggerExamplePayload } from "../examplePayloads";
import { dataSourceItemsPollingTriggerInputs } from "../inputs";
import type {
  DataSourceItemsChangesObject,
  NotionPaginationState,
  PollingState,
} from "../types";
import {
  fetchDataSourceItemsRound,
  floorToMinute,
  mergePollingCursor,
  resolveRecordChanges,
  resolveRoundState,
  splitDataSourceItems,
} from "../utils";
export const dataSourceItemsPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Data Source Items",
    description:
      "Retrieves existing and ongoing items for a specified Notion data source. Load history once, check for changes on a schedule, or both.",
  },
  inputs: dataSourceItemsPollingTriggerInputs,
  examplePayload: dataSourceItemsPollingTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, result) => {
      const data = result.payload.body.data as
        | DataSourceItemsChangesObject
        | undefined;
      return resolveRecordChanges(data?.newItems, data?.updatedItems);
    },
    getNextPaginationState: (_context, result) =>
      (result.payload.paginationState as NotionPaginationState | undefined) ??
      null,
  },
  perform: async (context, payload, params) => {
    const state = context.polling.getState() as unknown as PollingState;
    const handoff = context.instanceState?.[BACKFILL_CURSOR_KEY];
    const incoming =
      (payload.paginationState as NotionPaginationState | undefined) ??
      state.inFlightCursor;
    const windowStart =
      incoming?.windowStart ||
      state.lastPolledAt ||
      (typeof handoff === "string" ? handoff : "") ||
      (params.lookBackDate ? `${params.lookBackDate}T00:00:00.000Z` : "") ||
      floorToMinute(new Date());
    const client = createClient(params.connection, context.debug.enabled);
    const round = await fetchDataSourceItemsRound(
      client,
      params.dataSourceId,
      windowStart,
      incoming?.startCursor,
      context.batch?.enabled === true
        ? Math.min(MAX_POLL_PAGES_PER_RUN, MAX_BATCHED_PAGES_PER_RUN)
        : MAX_POLL_PAGES_PER_RUN,
    );
    const merged = mergePollingCursor(round.records, incoming);
    const { newItems, updatedItems } = splitDataSourceItems(
      round.records,
      windowStart,
      state.boundaryIds,
    );
    const { nextState, pollingState } = resolveRoundState({
      nextCursor: round.nextCursor,
      windowStart,
      merged,
      previous: state,
    });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Notion data source ${params.dataSourceId} from ${windowStart}: ${newItems.length} new, ${updatedItems.length} updated${nextState ? ", more pages outstanding" : ""}`,
      );
    }
    context.polling.setState(pollingState);
    return {
      payload: {
        ...payload,
        body: {
          data: {
            newItems,
            updatedItems,
          },
        },
        ...(nextState && context.batch?.enabled === true
          ? { paginationState: nextState }
          : {}),
      },
      polledNoChanges: !incoming && newItems.length + updatedItems.length === 0,
    };
  },
  onDeployPerform: async (context, payload, params) => {
    const incoming = payload.paginationState as
      | NotionPaginationState
      | undefined;
    if (!incoming && context.instanceState?.[BACKFILL_COMPLETED_KEY]) {
      context.logger.debug(
        "Notion data source item initial sync already completed for this instance; skipping.",
      );
      return {
        payload: {
          ...payload,
          body: { data: { newItems: [], updatedItems: [] } },
        },
        polledNoChanges: true,
      };
    }
    const windowStart =
      incoming?.windowStart ||
      (params.lookBackDate ? `${params.lookBackDate}T00:00:00.000Z` : "") ||
      floorToMinute(new Date());
    const client = createClient(params.connection, context.debug.enabled);
    const round = await fetchDataSourceItemsRound(
      client,
      params.dataSourceId,
      windowStart,
      incoming?.startCursor,
      DEFAULT_BACKFILL_MAX_PAGES,
    );
    const merged = mergePollingCursor(round.records, incoming);
    const { newItems, updatedItems } = splitDataSourceItems(
      round.records,
      windowStart,
    );
    context.logger.info(
      `Notion data source item initial sync from ${windowStart}: ${round.records.length} walked${round.nextCursor ? ", more pages outstanding" : ", backfill complete"}`,
    );
    if (round.nextCursor) {
      context.logger.error(
        `Notion data source item initial sync stopped at its ${DEFAULT_BACKFILL_MAX_PAGES} page limit with more pages outstanding. The first scheduled poll is pointed back at ${windowStart}, so nothing is skipped and what the sync already sent is sent again. Narrow the Look-back Date to avoid this.`,
      );
    }
    return {
      payload: {
        ...payload,
        body: {
          data: {
            newItems,
            updatedItems,
          },
        },
        ...(round.nextCursor && context.batch?.enabled === true
          ? {
              paginationState: {
                windowStart,
                startCursor: round.nextCursor,
                cursor: merged.cursor,
                boundaryIds: merged.boundaryIds,
              },
            }
          : {}),
      },
      instanceState: round.nextCursor
        ? undefined
        : {
            ...context.instanceState,
            [BACKFILL_CURSOR_KEY]: merged.cursor || windowStart,
            [BACKFILL_COMPLETED_KEY]: true,
          },
      polledNoChanges: !incoming && newItems.length + updatedItems.length === 0,
    };
  },
  onDeployResolver: {
    resolveItems: (_context, result) => {
      const data = result.payload.body.data as
        | DataSourceItemsChangesObject
        | undefined;
      return resolveRecordChanges(data?.newItems, data?.updatedItems);
    },
    getNextPaginationState: (_context, result) =>
      (result.payload.paginationState as NotionPaginationState | undefined) ??
      null,
  },
});
