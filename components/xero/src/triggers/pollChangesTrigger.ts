import { pollingTrigger } from "@prismatic-io/spectral";
import { getXeroClient } from "../client";
import { DEFAULT_BATCH_SIZE, POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesTriggerInputs } from "../inputs";
import type {
  PollingState,
  XeroChangesObject,
  XeroRecord,
  XeroRecordChange,
} from "../types";
import { fetchAllRecords, resolvePollingRecordChanges } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a selected Xero resource type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesTriggerInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): XeroRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as XeroChangesObject),
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState | null;
    const isFirstPoll = pollState?.knownIds === undefined;
    const { lookBackDate } = params;
    const isBackfill = isFirstPoll && Boolean(lookBackDate);

    const modifiedSince = isFirstPoll
      ? lookBackDate
        ? new Date(lookBackDate).toISOString()
        : now
      : (pollState?.lastPolledAt ?? now);

    const resource = params.resourceType;
    const config = POLL_RESOURCE_CONFIG[resource];

    if (!config) {
      throw new Error(`Unsupported resource type: ${resource}`);
    }

    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );

    const records = await fetchAllRecords(
      client,
      config.endpoint,
      config.responseKey,
      config.paginated,
      modifiedSince,
    );

    if (isFirstPoll && !lookBackDate) {
      const initialIds = records.map((r) => r[config.idField] as string);
      context.polling.setState({
        lastPolledAt: now,
        knownIds: initialIds,
      } as unknown as Record<string, unknown>);
      return {
        payload: {
          ...payload,
          body: { data: { created: [], updated: [] } },
        },
        polledNoChanges: true,
      };
    }

    const knownIds = new Set(pollState?.knownIds ?? []);
    const created: XeroRecord[] = [];
    const updated: XeroRecord[] = [];

    for (const record of records) {
      const id = record[config.idField] as string;
      if (knownIds.has(id)) {
        updated.push(record);
      } else {
        created.push(record);
        knownIds.add(id);
      }
    }

    const filteredCreated = isBackfill || params.showNewRecords ? created : [];
    const filteredUpdated =
      isBackfill || params.showUpdatedRecords ? updated : [];
    const totalChanges = filteredCreated.length + filteredUpdated.length;

    context.polling.setState({
      lastPolledAt: now,
      knownIds: Array.from(knownIds),
    } as unknown as Record<string, unknown>);

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resource}: ${records.length} total, ${created.length} new, ${updated.length} updated`,
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
