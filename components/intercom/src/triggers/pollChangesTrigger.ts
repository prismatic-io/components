import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { connectionInput } from "../inputs";
import {
  lookBackDate,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
} from "../inputs/triggers";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import {
  fetchChangedRecords,
  resolvePollingRecordChanges,
  resolvePollWindow,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a specified Intercom resource type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: {
    connection: connectionInput,
    resourceType: pollResourceType,
    showNewRecords,
    showUpdatedRecords,
    lookBackDate,
  },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const window = resolvePollWindow(pollState, params.lookBackDate, now);
    const client = createClient(params.connection, context.debug.enabled);
    const data = await fetchChangedRecords(
      client,
      params.resourceType,
      window,
      {
        showNew: params.showNewRecords,
        showUpdated: params.showUpdatedRecords,
      },
    );
    const totalChanges = data.created.length + data.updated.length;
    context.polling.setState({
      lastPolledAt: now,
    } as unknown as Record<string, unknown>);
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${params.resourceType}: ${data.created.length} new, ${data.updated.length} updated`,
      );
    }
    return {
      payload: { ...payload, body: { data } },
      polledNoChanges: totalChanges === 0,
    };
  },
});
