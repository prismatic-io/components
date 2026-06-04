import { pollingTrigger } from "@prismatic-io/spectral";
import { createAlgoliaClient } from "../client";
import { connectionInput, showNewRecords, showUpdatedRecords } from "../inputs";
import type { AlgoliaIndex, PollingState } from "../types";
import { fetchAllIndices } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Indices",
    description:
      "Checks for new and updated indices in Algolia on a configured schedule.",
  },
  inputs: {
    algoliaConnection: connectionInput,
    showNewRecords,
    showUpdatedRecords,
  },
  perform: async (
    context,
    payload,
    { algoliaConnection, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

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

    const filteredCreated = showNewRecords ? created : [];
    const filteredUpdated = showUpdatedRecords ? updated : [];
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
