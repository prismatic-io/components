import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_BATCH_SIZE, POLL_RESOURCE_CONFIG } from "../constants";
import {
  connection,
  lookBackDate,
  pollResourceType,
  showNewRecords,
} from "../inputs";
import type {
  PollingState,
  PowerBIChangesObject,
  PowerBIRecord,
  PowerBIRecordChange,
} from "../types";
import { resolvePollingRecordChanges } from "../util/polling";
import { paginateResults } from "../utils";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Records",
    description:
      "Retrieves existing and ongoing records for a selected Power BI resource type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: {
    connection,
    resourceType: pollResourceType,
    showNewRecords,
    lookBackDate,
  },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PowerBIRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PowerBIChangesObject),
  },
  perform: async (
    context,
    payload,
    { connection, resourceType, showNewRecords, lookBackDate },
  ) => {
    const now = new Date().toISOString();
    const lastState = context.polling.getState() as PollingState;
    const config = POLL_RESOURCE_CONFIG[resourceType];

    if (!config) {
      throw new Error(`Unsupported resource type: ${resourceType}`);
    }

    const client = createClient({ connection }, context.debug.enabled);
    const { value: records } = await paginateResults<PowerBIRecord>(
      client,
      config.endpoint,
      true,
    );

    const hasTimestamps = config.createdAtField !== null;
    const lastPolledAt =
      lastState?.lastPolledAt ??
      (hasTimestamps && lookBackDate
        ? new Date(lookBackDate).toISOString()
        : now);
    const isBackfill =
      hasTimestamps && !lastState?.lastPolledAt && Boolean(lookBackDate);

    let created: PowerBIRecord[];

    if (hasTimestamps) {
      const lastPolledDate = new Date(lastPolledAt);
      created = records.filter((r) => {
        const createdAt = r[config.createdAtField as string] as string;
        return createdAt && new Date(createdAt) > lastPolledDate;
      });
    } else {
      const isFirstPoll = lastState?.knownIds === undefined;
      if (isFirstPoll) {
        context.polling.setState({
          lastPolledAt: now,
          knownIds: records.map((r) => r.id),
        } as unknown as Record<string, unknown>);
        return {
          payload: {
            ...payload,
            body: { data: { created: [], updated: [] } },
          },
          polledNoChanges: true,
        };
      }
      const knownSet = new Set(lastState.knownIds);
      created = records.filter((r) => !knownSet.has(r.id));
    }

    const filteredCreated = isBackfill || showNewRecords ? created : [];

    const newState: PollingState = { lastPolledAt: now };
    if (!hasTimestamps) {
      newState.knownIds = records.map((r) => r.id);
    }
    context.polling.setState(newState as unknown as Record<string, unknown>);

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resourceType}: ${records.length} total, ${filteredCreated.length} new`,
      );
    }

    return {
      payload: {
        ...payload,
        body: { data: { created: filteredCreated, updated: [] } },
      },
      polledNoChanges: filteredCreated.length === 0,
    };
  },
});
