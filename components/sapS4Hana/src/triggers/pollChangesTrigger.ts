import { pollingTrigger } from "@prismatic-io/spectral";
import { getSapClient } from "../client";
import {
  connectionInput,
  lookBackDate,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
} from "../inputs";
import { POLL_RESOURCE_CONFIG } from "../constants";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
  SapRecord,
} from "../types";
import {
  toSapDateTime,
  fetchAllRecords,
  resolvePollWindow,
  resolvePollingRecordChanges,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a specified SAP S/4HANA resource type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: {
    connection: connectionInput,
    resourceType: pollResourceType,
    showNewRecords,
    showUpdatedRecords,
    lookBackDate,
  },
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
      showNewRecords,
      showUpdatedRecords,
      lookBackDate,
    },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const { since: lastPolledAt, isBackfill } = resolvePollWindow(
      pollState,
      lookBackDate,
      now,
    );
    const config = POLL_RESOURCE_CONFIG[resourceType];

    if (!config) {
      throw new Error(`Unsupported resource type: ${resourceType}`);
    }

    const client = getSapClient(connection);
    const sapDateTime = toSapDateTime(lastPolledAt);
    const filter = `${config.filterField} ge ${sapDateTime}`;
    const records = await fetchAllRecords(client, config.endpoint, filter);

    const lastPolledDate = new Date(lastPolledAt);
    const created: SapRecord[] = [];
    const updated: SapRecord[] = [];

    for (const record of records) {
      const createdAt = record[config.createdAtField] as string;
      if (createdAt && new Date(createdAt) > lastPolledDate) {
        created.push(record);
      } else {
        updated.push(record);
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
        `Polled ${resourceType}: ${records.length} total, ${filteredCreated.length} new, ${filteredUpdated.length} updated`,
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
