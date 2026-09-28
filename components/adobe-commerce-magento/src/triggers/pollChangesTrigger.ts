import { pollingTrigger } from "@prismatic-io/spectral";
import { pollChangesExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { MagentoRecord, PollingState } from "../types";
import { fetchMagentoRecordsSince } from "../utils";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks a Magento resource collection (orders, customers, or products) on a configured schedule for records whose `updated_at` is at or after the last poll. Records whose `created_at` is also after the last poll are included in the payload's `body.data.created` array; older records modified since the last poll are included in `body.data.updated`.",
  },
  examplePayload: pollChangesExamplePayload,
  inputs: pollChangesInputs,
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
