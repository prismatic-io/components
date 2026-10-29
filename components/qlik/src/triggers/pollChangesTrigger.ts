import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_BATCH_SIZE, POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesInputs } from "../inputs";
import type {
  QlikChangesObject,
  QlikRecordChange,
  PollingState,
} from "../types";
import {
  fetchAllSince,
  filterByTimestamp,
  resolvePollingRecordChanges,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records from Qlik. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): QlikRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as QlikChangesObject),
  },
  async perform(context, payload, params) {
    const config = POLL_RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }

    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;

    const isInitialSync = !state?.lastPolledAt && Boolean(params.lookBackDate);
    const lastPolledAt = state?.lastPolledAt ?? (params.lookBackDate || now);

    const client = createClient(params.connection, context.debug.enabled);
    const allRecords = await fetchAllSince(
      client,
      params.pollResourceType,
      lastPolledAt,
    );

    const { created, updated } = filterByTimestamp(
      allRecords,
      config,
      lastPolledAt,
    );

    const filteredCreated =
      isInitialSync || params.showNewRecords ? created : [];
    const filteredUpdated =
      isInitialSync || params.showUpdatedRecords ? updated : [];
    const totalMatched = filteredCreated.length + filteredUpdated.length;

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${allRecords.length} ${params.pollResourceType} records, ${totalMatched} matched (${created.length} new, ${updated.length} updated) since last poll.`,
      );
    }

    context.polling.setState({ lastPolledAt: now });

    return {
      payload: {
        ...payload,
        body: {
          data: { created: filteredCreated, updated: filteredUpdated },
        },
      },
      polledNoChanges: totalMatched === 0,
    };
  },
});
