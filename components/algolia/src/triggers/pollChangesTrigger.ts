import { pollingTrigger } from "@prismatic-io/spectral";
import { createAlgoliaClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import {
  connectionInput,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
} from "../inputs";
import type {
  AlgoliaChangesObject,
  AlgoliaIndex,
  AlgoliaRecordChange,
  PollingState,
} from "../types";
import { fetchAllIndices, resolvePollingRecordChanges } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Indices",
    description:
      "Retrieves existing and ongoing indices in Algolia. Load history once, check for changes on a schedule, or both.",
  },
  inputs: {
    algoliaConnection: connectionInput,
    showNewRecords,
    showUpdatedRecords,
    lookBackDate,
  },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): AlgoliaRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as AlgoliaChangesObject),
  },
  perform: async (
    context,
    payload,
    { algoliaConnection, showNewRecords, showUpdatedRecords, lookBackDate },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const isBackfill = !pollState?.lastPolledAt && Boolean(lookBackDate);
    const lastPolledAt = pollState?.lastPolledAt ?? (lookBackDate || now);

    const client = createAlgoliaClient({
      algoliaConnection,
      isGoingToRead: true,
      debug: context.debug.enabled,
    });

    const indices = await fetchAllIndices(client);
    const lastPolledDate = new Date(lastPolledAt);

    const created: AlgoliaIndex[] = [];
    const updated: AlgoliaIndex[] = [];

    for (const index of indices) {
      if (index.createdAt && new Date(index.createdAt) > lastPolledDate) {
        created.push(index);
      } else if (
        index.updatedAt &&
        new Date(index.updatedAt) > lastPolledDate
      ) {
        updated.push(index);
      }
    }

    const filteredCreated = isBackfill || showNewRecords ? created : [];
    const filteredUpdated = isBackfill || showUpdatedRecords ? updated : [];
    const totalChanges = filteredCreated.length + filteredUpdated.length;

    context.polling.setState({
      lastPolledAt: now,
    } as unknown as Record<string, unknown>);

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled indices: ${indices.length} total, ${filteredCreated.length} new, ${filteredUpdated.length} updated`,
      );
    }

    return {
      payload: {
        ...payload,
        body: {
          data: { created: filteredCreated, updated: filteredUpdated },
        },
      },
      polledNoChanges: totalChanges === 0,
    };
  },
});
