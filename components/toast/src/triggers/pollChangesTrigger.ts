import { pollingTrigger } from "@prismatic-io/spectral";
import { createToastClient } from "../client";
import { TIME_ENTRY_MAX_POLL_WINDOW_MS } from "../constants";
import { pollChangesTriggerExamplePayload as examplePayload } from "../examplePayloads";
import { pollChangesInputs as inputs } from "../inputs/triggers";
import type { PollingState, ToastTimeEntryRecord } from "../interfaces";
import { fetchTimeEntriesModified } from "../utils";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Time Entries",
    description:
      "Checks for new and updated time entries in Toast on a configured schedule.",
  },
  inputs,
  examplePayload,
  perform: async (
    context,
    payload,
    { connection, restaurantExternalId, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    
    
    
    
    const minStartMs = Date.now() - TIME_ENTRY_MAX_POLL_WINDOW_MS;
    const modifiedStartDate = new Date(
      Math.max(new Date(lastPolledAt).getTime(), minStartMs),
    ).toISOString();
    const modifiedEndDate = now;

    const client = await createToastClient(
      connection,
      context.debug.enabled,
      restaurantExternalId,
    );
    const records = await fetchTimeEntriesModified(
      client,
      modifiedStartDate,
      modifiedEndDate,
    );

    
    
    
    const lastPolledDate = new Date(lastPolledAt);
    const created: ToastTimeEntryRecord[] = [];
    const updated: ToastTimeEntryRecord[] = [];

    for (const record of records) {
      const createdDate =
        typeof record.createdDate === "string"
          ? new Date(record.createdDate)
          : null;
      const modifiedDate =
        typeof record.modifiedDate === "string"
          ? new Date(record.modifiedDate)
          : null;

      const isNew = createdDate !== null && createdDate > lastPolledDate;
      const isUpdated =
        !isNew && modifiedDate !== null && modifiedDate > lastPolledDate;

      if (isNew && showNewRecords) created.push(record);
      else if (isUpdated && showUpdatedRecords) updated.push(record);
    }

    context.polling.setState({ lastPolledAt: now } as PollingState);

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled time entries: ${records.length} fetched, ${created.length} created, ${updated.length} updated`,
      );
    }

    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: created.length + updated.length === 0,
    };
  },
});
