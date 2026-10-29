import { pollingTrigger } from "@prismatic-io/spectral";
import { getSageClient } from "../client";
import { DEFAULT_BATCH_SIZE, POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesInputs } from "../inputs";
import type { PollingState, SageChangesObject, SageRecord } from "../types";
import { fetchAllSince, resolvePollingRecordChanges } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a specified Sage Accounting resource. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }) =>
      resolvePollingRecordChanges(
        payload.body.data as SageChangesObject | undefined,
      ),
  },
  perform: async (
    context,
    payload,
    {
      connection,
      resourceType,
      lookBackDate,
      showNewRecords,
      showUpdatedRecords,
    },
  ) => {
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState | undefined;

    const isInitialSync = !state?.lastPolledAt && Boolean(lookBackDate);
    const lastPolledAt =
      state?.lastPolledAt ??
      (lookBackDate ? new Date(lookBackDate).toISOString() : now);

    const config = POLL_RESOURCE_CONFIG[resourceType];

    if (!config) {
      throw new Error(`Unsupported resource type: ${resourceType}`);
    }

    const sinceDate = new Date(lastPolledAt);
    const client = getSageClient(connection, context.debug.enabled);
    const records = await fetchAllSince(client, config.endpoint, lastPolledAt);

    const created: SageRecord[] = [];
    const updated: SageRecord[] = [];

    for (const record of records) {
      const createdAt = record.created_at as string;
      if (createdAt && new Date(createdAt) > sinceDate) {
        created.push(record);
      } else {
        updated.push(record);
      }
    }

    const filteredCreated = isInitialSync || showNewRecords ? created : [];
    const filteredUpdated = isInitialSync || showUpdatedRecords ? updated : [];
    const totalChanges = filteredCreated.length + filteredUpdated.length;

    context.polling.setState({ lastPolledAt: now } as unknown as Record<
      string,
      unknown
    >);

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resourceType}: ${records.length} total, ${filteredCreated.length} new, ${filteredUpdated.length} updated`,
      );
    }

    return {
      payload: {
        ...payload,
        body: { data: { created: filteredCreated, updated: filteredUpdated } },
      },
      polledNoChanges: totalChanges === 0,
    };
  },
});
