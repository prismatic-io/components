import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { PollResource } from "../constants";
import {
  connectionInput,
  MarketplaceIds,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
} from "../inputs";
import type { AmazonRecord, PollingState } from "../types";
import { fetchFeedsSince, fetchOrdersSince } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated orders or feeds in Amazon Seller Central on a configured schedule.",
  },
  inputs: {
    connection: connectionInput,
    resourceType: pollResourceType,
    marketplaceIds: MarketplaceIds,
    showNewRecords,
    showUpdatedRecords,
  },
  perform: async (
    context,
    payload,
    {
      connection,
      resourceType,
      marketplaceIds,
      showNewRecords,
      showUpdatedRecords,
    },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    const client = createClient(connection, context.debug.enabled);

    let created: AmazonRecord[] = [];
    const updated: AmazonRecord[] = [];

    if (resourceType === PollResource.ORDERS) {
      const records = await fetchOrdersSince(
        client,
        lastPolledAt,
        marketplaceIds,
      );

      const lastPolledDate = new Date(lastPolledAt);
      for (const record of records) {
        const purchaseDate = record.PurchaseDate as string;
        if (purchaseDate && new Date(purchaseDate) > lastPolledDate) {
          created.push(record);
        } else {
          updated.push(record);
        }
      }
    } else {
      created = await fetchFeedsSince(client, lastPolledAt);
    }

    const filteredCreated = showNewRecords ? created : [];
    const filteredUpdated = showUpdatedRecords ? updated : [];
    const totalChanges = filteredCreated.length + filteredUpdated.length;

    context.polling.setState({
      lastPolledAt: now,
    });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resourceType}: ${filteredCreated.length} new, ${filteredUpdated.length} updated`,
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
