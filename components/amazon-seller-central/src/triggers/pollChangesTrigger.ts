import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads/triggers";
import { pollChangesTriggerInputs } from "../inputs";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import { fetchPollingChanges, resolvePollingRecordChanges } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated orders or feeds in Amazon Seller Central on a schedule.",
  },
  inputs: pollChangesTriggerInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
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
      lookBackDate,
    },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const isInitialSync =
      pollState?.lastPolledAt === undefined && Boolean(lookBackDate);
    const lastPolledAt = pollState?.lastPolledAt ?? (lookBackDate || now);

    const client = createClient(connection, context.debug.enabled);
    const { created, updated } = await fetchPollingChanges(
      client,
      resourceType,
      lastPolledAt,
      marketplaceIds,
    );

    const filteredCreated = showNewRecords || isInitialSync ? created : [];
    const filteredUpdated = showUpdatedRecords || isInitialSync ? updated : [];
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
