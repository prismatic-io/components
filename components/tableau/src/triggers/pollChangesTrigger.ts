import { pollingTrigger } from "@prismatic-io/spectral";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { ChangesObject, PollingState, TableauRecord } from "../types";
import {
  fetchTableauRecordsSince,
  getTableauClient,
  resolvePollingRecordChanges,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a selected Tableau resource type. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }) =>
      resolvePollingRecordChanges(
        payload.body.data as ChangesObject | undefined,
      ),
  },
  perform: async (
    context,
    payload,
    {
      tableauConnection,
      pollResourceType,
      lookBackDate,
      showNewRecords,
      showUpdatedRecords,
    },
  ) => {
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;

    const isInitialSync = !state?.lastPolledAt && Boolean(lookBackDate);
    const lastPolledAt =
      state?.lastPolledAt ??
      (lookBackDate ? new Date(lookBackDate).toISOString() : now);

    const client = await getTableauClient({
      tableauConnection,
      debug: context.debug.enabled,
    });
    const { records, truncated } = await fetchTableauRecordsSince(
      client,
      pollResourceType,
      lastPolledAt,
    );

    const lastPolledAtDate = new Date(lastPolledAt);
    const created: TableauRecord[] = [];
    const updated: TableauRecord[] = [];

    for (const record of records) {
      const createdValue = record.createdAt;
      const createdAtDate =
        typeof createdValue === "string" ? new Date(createdValue) : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      if (isNew && (isInitialSync || showNewRecords !== false))
        created.push(record);
      else if (!isNew && (isInitialSync || showUpdatedRecords !== false))
        updated.push(record);
    }

    let nextCursor = now;
    if (truncated) {
      const latestUpdatedAt = records[records.length - 1]?.updatedAt;
      nextCursor =
        typeof latestUpdatedAt === "string" ? latestUpdatedAt : lastPolledAt;
      context.logger.warn(
        `Polling truncated at the page cap for Tableau ${pollResourceType}. Advancing cursor to ${nextCursor}; next poll will resume from there.`,
      );
    }
    context.polling.setState({ lastPolledAt: nextCursor });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Tableau ${pollResourceType}: ${records.length} fetched, ${created.length} created, ${updated.length} updated, truncated=${truncated}`,
      );
    }

    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
