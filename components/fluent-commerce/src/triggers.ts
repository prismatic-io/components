import { pollingTrigger } from "@prismatic-io/spectral";
import { pollChangesExamplePayload } from "./examplePayloads";
import { pollChangesInputs } from "./inputs";
import type { FluentOrder, PollingState } from "./types";
import { fetchFluentOrdersSince } from "./util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Polls Fluent Commerce for orders whose `updatedOn` is at or after the last poll. Orders whose `createdOn` is also after the last poll go to the `created` branch; older orders modified since the last poll go to `updated`.",
  },
  examplePayload: pollChangesExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    const { records, truncated } = await fetchFluentOrdersSince(
      params.connection,
      lastPolledAt,
      params.retailerId,
      context.debug.enabled,
    );

    
    
    
    
    const lastPolledAtDate = new Date(lastPolledAt);
    const created: FluentOrder[] = [];
    const updated: FluentOrder[] = [];

    for (const record of records) {
      const createValue = record.createdOn;
      const createdAtDate =
        typeof createValue === "string" ? new Date(createValue) : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      if (isNew && params.showNewRecords !== false) created.push(record);
      else if (!isNew && params.showUpdatedRecords !== false)
        updated.push(record);
    }

    
    
    
    
    
    
    let nextCursor = now;
    if (truncated) {
      const minUpdatedOn = records
        .map((r) => r.updatedOn)
        .filter((u): u is string => typeof u === "string")
        .sort()
        .shift();
      nextCursor = minUpdatedOn ?? lastPolledAt;
      context.logger.warn(
        `Polling truncated at the page cap for Fluent orders. Advancing cursor to ${nextCursor}; next poll will resume from there.`,
      );
    }
    context.polling.setState({ lastPolledAt: nextCursor });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Fluent orders: ${records.length} fetched, ${created.length} created, ${updated.length} updated, truncated=${truncated}`,
      );
    }

    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});

export default { pollChangesTrigger };
