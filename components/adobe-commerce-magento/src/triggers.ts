import { pollingTrigger, trigger } from "@prismatic-io/spectral";
import { pollChangesExamplePayload } from "./examplePayloads";
import { fetchMagentoRecordsSince } from "./helpers";
import { pollChangesInputs } from "./inputs";
import type { MagentoRecord, PollingState } from "./types";

export const myTrigger = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Adobe Commerce for webhooks you configure.",
  },
  perform: async (context, payload, params) => {
    return Promise.resolve({
      payload,
    });
  },
  inputs: {},
  synchronousResponseSupport: "valid",
  scheduleSupport: "valid",
});

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Polls a Magento resource collection (orders, customers, or products) for records whose `updated_at` is at or after the last poll. Records whose `created_at` is also after the last poll go to the `created` branch; older records modified since the last poll go to `updated`.",
  },
  examplePayload: pollChangesExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

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
        typeof createValue === "string" ? new Date(createValue.replace(" ", "T") + "Z") : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      if (isNew && params.showNewRecords !== false) created.push(record);
      else if (!isNew && params.showUpdatedRecords !== false) updated.push(record);
    }

    
    
    
    
    let nextCursor = now;
    if (truncated) {
      const oldestUpdatedAt = records[records.length - 1]?.updated_at;
      nextCursor =
        typeof oldestUpdatedAt === "string"
          ? new Date(oldestUpdatedAt.replace(" ", "T") + "Z").toISOString()
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

export default { myTrigger, pollChangesTrigger };
