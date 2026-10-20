import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type {
  PollingState,
  SmartsheetChangesObject,
  SmartsheetRecordChange,
} from "../types";
import {
  fetchSheetsSince,
  formatSmartsheetTimestamp,
  partitionSheetsByTimestamp,
  resolvePollingRecordChanges,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Sheets",
    description:
      "Retrieves existing and ongoing Sheets from Smartsheet. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): SmartsheetRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as SmartsheetChangesObject),
  },
  perform: async (
    context,
    payload,
    { connection, showNewRecords, showUpdatedRecords, lookBackDate },
  ) => {
    const pollState = context.polling.getState() as PollingState;
    const now = new Date();
    const isInitialSync = !pollState?.lastPolledAt && Boolean(lookBackDate);
    const lastPolledAt =
      pollState?.lastPolledAt ?? (lookBackDate || now.toISOString());
    const sinceDate = new Date(lastPolledAt);
    const client = createClient(connection, context.debug.enabled);
    const sheets = await fetchSheetsSince(
      client,
      formatSmartsheetTimestamp(sinceDate),
    );
    const { created, updated } = partitionSheetsByTimestamp(sheets, sinceDate);
    context.polling.setState({
      lastPolledAt: now.toISOString(),
    } as Record<string, unknown>);
    const result = {
      created: isInitialSync || showNewRecords ? created : [],
      updated: isInitialSync || showUpdatedRecords ? updated : [],
    };
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled sheets: ${sheets.length} total → ${created.length} new, ${updated.length} updated`,
      );
    }
    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges:
        result.created.length === 0 && result.updated.length === 0,
    };
  },
});
