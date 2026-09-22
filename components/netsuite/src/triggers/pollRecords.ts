import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollRecordsExamplePayload } from "../examplePayloads";
import { pollRecordsInputs } from "../inputs";
import type { NetSuitePollingState } from "../types/PollingState";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingTriggerObject,
} from "../types/PollingTriggerObject";
import {
  buildPollingQuery,
  fetchAllRecords,
  getPollingChanges,
  resolvePollingRecordChanges,
} from "../utils";
export const pollRecords = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a specified NetSuite record type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollRecordsInputs,
  examplePayload: pollRecordsExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState =
      context.polling.getState() as unknown as NetSuitePollingState;
    const { query, lastPolledAt, isInitialSync } = buildPollingQuery(
      pollState,
      params,
      now,
    );
    context.logger.debug(`Polled for changes from: ${lastPolledAt} to ${now}`);
    if (context.debug.enabled) {
      context.logger.debug(`Polling state: ${JSON.stringify(pollState)}`);
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
      isInitialSync || params.showNewRecords,
      isInitialSync || params.showUpdatedRecords,
      typedRecords,
      isInitialSync
        ? new Date(new Date(lastPolledAt).getTime() - 1)
        : new Date(lastPolledAt),
    );
    context.polling.setState({ lastPolledAt: now });
    return {
      payload: { ...payload, body: { data: changesObject } },
      polledNoChanges: changes === 0,
    };
  },
});
