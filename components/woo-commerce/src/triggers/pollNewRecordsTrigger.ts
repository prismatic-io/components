import { pollingTrigger, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import {
  DEFAULT_BATCH_SIZE,
  RESOURCE_ENDPOINT_MAP,
  WATERMARK_RESOURCES,
} from "../constants";
import { connectionInput, lookBackDate, resourceType } from "../inputs";
import type {
  PollCursor,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import {
  fetchCustomersSince,
  pollWatermark,
  resolvePollingRecordChanges,
} from "../util";

export const pollNewRecordsTrigger = pollingTrigger({
  display: {
    label: "New Records",
    description:
      "Retrieves existing and ongoing records for a specified WooCommerce resource type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: {
    connection: connectionInput,
    resourceType,
    lookBackDate,
  },
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
    const state = context.polling.getState() as PollingState | null;
    const client = getClient(params.connection, context.debug.enabled);
    const resource = util.types.toString(params.resourceType);
    const endpoint = RESOURCE_ENDPOINT_MAP[resource];

    if (!WATERMARK_RESOURCES.includes(resource)) {
      const created = await fetchCustomersSince(
        client,
        endpoint,
        state,
        params.lookBackDate,
        now,
      );
      context.polling.setState({ lastPolledAt: now });
      return {
        payload: { ...payload, body: { data: { created, updated: [] } } },
        polledNoChanges: !payload.paginationState && created.length === 0,
      };
    }

    const incoming = payload.paginationState as PollCursor | undefined;
    const { result, nextState } = await pollWatermark(client, endpoint, {
      state,
      incoming,
      lookBackDate: params.lookBackDate,
      now,
      batching: context.batch?.enabled === true,
    });
    context.polling.setState(nextState);

    return {
      payload: {
        ...payload,
        paginationState: result.drained ? undefined : result.cursor,
        body: { data: { created: result.records, updated: [] } },
      },
      polledNoChanges:
        result.drained && !incoming && result.records.length === 0,
    };
  },
});
