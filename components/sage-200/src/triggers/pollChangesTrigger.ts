import { pollingTrigger } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesInputs } from "../inputs/polling";
import type {
  PollingState,
  Sage200Changes,
  Sage200Record,
  Sage200RecordChange,
} from "../types";
import {
  filterByTimestamp,
  resolvePollWindow,
  resolveSage200RecordChanges,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a specified Sage 200 resource type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): Sage200RecordChange[] =>
      resolveSage200RecordChanges(payload.body.data as Sage200Changes),
  },
  perform: async (context, payload, params) => {
    const config = POLL_RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;
    const { lastPolledAt, includeNew, includeUpdated } = resolvePollWindow(
      state,
      params,
      now,
    );
    if (!includeNew && !includeUpdated) {
      context.polling.setState({ lastPolledAt: now });
      return {
        payload: { ...payload, body: { data: { created: [], updated: [] } } },
        polledNoChanges: true,
      };
    }
    const client = getClient(
      params.connection,
      context.debug.enabled,
      params.site,
      params.company,
    );
    const { data } = await client.get<Sage200Record[]>(config.endpoint, {
      params: { $filter: `date_time_updated gt ${lastPolledAt}` },
    });
    const allRecords = Array.isArray(data) ? data : [];
    const { created, updated } = filterByTimestamp(
      allRecords,
      lastPolledAt,
      includeNew,
      includeUpdated,
    );
    const totalMatched = created.length + updated.length;
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${allRecords.length} ${params.pollResourceType} records, ${totalMatched} matched since last poll (${created.length} created, ${updated.length} updated).`,
      );
    }
    context.polling.setState({ lastPolledAt: now });
    return {
      payload: {
        ...payload,
        body: {
          data: { created, updated },
        },
      },
      polledNoChanges: totalMatched === 0,
    };
  },
});
