import { pollingTrigger } from "@prismatic-io/spectral";
import type { EntryProps, KeyValueMap } from "contentful-management";
import { createClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { PollingState } from "../types";
import { fetchEntriesSince, getEnvironment } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Entries",
    description:
      "Checks for new and updated entries in a selected Contentful environment on a configured schedule.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    const client = createClient(params.connection, context);
    const environment = await getEnvironment(
      client,
      params.spaceId,
      params.environmentId,
    );
    const { records, truncated } = await fetchEntriesSince(
      environment,
      lastPolledAt,
      params.contentTypeId,
    );

    
    
    
    
    const lastPolledAtDate = new Date(lastPolledAt);
    const created: EntryProps<KeyValueMap>[] = [];
    const updated: EntryProps<KeyValueMap>[] = [];

    for (const record of records) {
      const createdValue = record.sys?.createdAt;
      const createdAtDate =
        typeof createdValue === "string" ? new Date(createdValue) : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      if (isNew && params.showNewRecords !== false) created.push(record);
      else if (!isNew && params.showUpdatedRecords !== false)
        updated.push(record);
    }

    
    
    
    let nextCursor = now;
    if (truncated) {
      const oldestUpdatedAt = records[records.length - 1]?.sys?.updatedAt;
      nextCursor =
        typeof oldestUpdatedAt === "string" ? oldestUpdatedAt : lastPolledAt;
      context.logger.warn(
        `Polling truncated at the page cap for Contentful entries. Advancing cursor to ${nextCursor}; next poll will resume from there.`,
      );
    }
    context.polling.setState({ lastPolledAt: nextCursor });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Contentful entries: ${records.length} fetched, ${created.length} created, ${updated.length} updated, truncated=${truncated}`,
      );
    }

    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
