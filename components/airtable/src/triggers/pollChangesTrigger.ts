import { pollingTrigger } from "@prismatic-io/spectral";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { fetchAirtableRecordsSince } from "../helpers/triggers/polling";
import { pollChangesInputs } from "../inputs";
import type { AirtableRecord, PollingState } from "../types";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks an Airtable table for new and updated records on a configured schedule, using `LAST_MODIFIED_TIME()` as the server-side filter. Records are partitioned by `createdTime` versus `lastPolledAt`: records whose `createdTime` is after `lastPolledAt` go to the `created` bucket, while older records modified since `lastPolledAt` go to the `updated` bucket.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    const { records, truncated } = await fetchAirtableRecordsSince(
      params.airtableConnection,
      params.baseId,
      params.tableName,
      lastPolledAt,
      context.debug.enabled,
      params.pollView,
      params.additionalFilter,
    );

    const lastPolledAtDate = new Date(lastPolledAt);
    const created: AirtableRecord[] = [];
    const updated: AirtableRecord[] = [];

    for (const record of records) {
      const createdAtDate =
        typeof record.createdTime === "string"
          ? new Date(record.createdTime)
          : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      if (isNew && params.showNewRecords !== false) created.push(record);
      else if (!isNew && params.showUpdatedRecords !== false)
        updated.push(record);
    }

    
    
    
    
    
    let nextCursor = now;
    if (truncated) {
      const latestCreated = records
        .map((r) => r.createdTime)
        .filter((t): t is string => typeof t === "string")
        .sort()
        .pop();
      nextCursor = latestCreated ?? lastPolledAt;
      context.logger.warn(
        `Polling truncated at the page cap for Airtable table ${params.tableName}. Advancing cursor to ${nextCursor}; next poll will resume from there.`,
      );
    }
    context.polling.setState({ lastPolledAt: nextCursor });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Airtable ${params.baseId}/${params.tableName}: ${records.length} fetched, ${created.length} created, ${updated.length} updated, truncated=${truncated}`,
      );
    }

    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
