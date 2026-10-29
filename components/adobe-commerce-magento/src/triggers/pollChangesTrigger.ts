import { pollingTrigger } from "@prismatic-io/spectral";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type {
  MagentoChangesObject,
  MagentoRecord,
  MagentoRecordChange,
  PollingState,
} from "../types";
import {
  fetchMagentoRecordsSince,
  resolvePollingRecordChanges,
} from "../utils";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a specified Adobe Commerce resource type. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: pollChangesExamplePayload,
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): MagentoRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as MagentoChangesObject),
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const isInitialSync = !pollState?.lastPolledAt;
    const lastPolledAt =
      pollState?.lastPolledAt ?? (params.lookBackDate || now);

    const { records, truncated } = await fetchMagentoRecordsSince(
      params.connection,
      params.pollResourceType,
      lastPolledAt,
      context.debug.enabled,
    );

    const lastPolledAtDate = new Date(lastPolledAt);
    const created: MagentoRecord[] = [];
    const updated: MagentoRecord[] = [];

    for (const record of records) {
      const createValue = record.created_at;
      const createdAtDate =
        typeof createValue === "string"
          ? new Date(createValue.replace(" ", "T") + "Z")
          : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      if (isNew && (isInitialSync || params.showNewRecords !== false))
        created.push(record);
      else if (!isNew && (isInitialSync || params.showUpdatedRecords !== false))
        updated.push(record);
    }

    let nextCursor = now;
    if (truncated) {
      const newestFetchedUpdatedAt = records[records.length - 1]?.updated_at;
      nextCursor =
        typeof newestFetchedUpdatedAt === "string"
          ? new Date(
              newestFetchedUpdatedAt.replace(" ", "T") + "Z",
            ).toISOString()
          : lastPolledAt;
      context.logger.warn(
        `Polling truncated at the page cap for Magento ${params.pollResourceType}. Advancing cursor to ${nextCursor}; next poll will resume from there.`,
      );
    }
    context.polling.setState({ lastPolledAt: nextCursor });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Magento ${params.pollResourceType}: ${records.length} fetched, ${created.length} created, ${updated.length} updated, truncated=${truncated}`,
      );
    }

    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
