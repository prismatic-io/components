import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { pollRecordsInputs } from "../inputs";
import type { NetSuitePollingState } from "../types/PollingState";
import type { PollingTriggerObject } from "../types/PollingTriggerObject";
import { fetchAllRecords, getPollingChanges } from "../utils";

export const pollRecords = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected NetSuite record type on a configured schedule.",
  },
  inputs: pollRecordsInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();

    
    const pollState =
      context.polling.getState() as unknown as NetSuitePollingState;
    const lastPolledAt = pollState?.lastPolledAt || now;

    context.logger.debug(`Polled for changes from: ${lastPolledAt} to ${now}`);
    if (context.debug.enabled) {
      context.logger.debug(`Polling state: ${JSON.stringify(pollState)}`);
    }

    
    let query = `lastmodifieddate AFTER ${lastPolledAt}`;

    if (params.additionalFilter) {
      query += ` AND ${params.additionalFilter}`;
    }

    context.logger.debug(`Query: ${query}`);

    const client = await createClient(
      params.connection,
      "record",
      context.debug.enabled,
    );

    const allRecords = await fetchAllRecords({
      client,
      recordType: params.recordType,
      query,
    });

    
    const typedRecords = allRecords as PollingTriggerObject[];

    
    const { changes, changesObject } = getPollingChanges(
      params.showNewRecords,
      params.showUpdatedRecords,
      typedRecords,
      new Date(lastPolledAt),
    );

    context.polling.setState({ lastPolledAt: now });

    return {
      payload: { ...payload, body: { data: changesObject } },
      polledNoChanges: changes === 0,
    };
  },
});
