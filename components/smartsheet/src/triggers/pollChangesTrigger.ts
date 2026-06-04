import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { pollChangesExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { PollingState } from "../types";
import {
  fetchSheetsSince,
  formatSmartsheetTimestamp,
  partitionSheetsByTimestamp,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Sheets",
    description:
      "Polls Smartsheet for sheets created or modified since the last execution, separated into new and updated buckets.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesExamplePayload,
  perform: async (
    context,
    payload,
    { connection, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date();
    const lastState = context.polling.getState() as PollingState | undefined;
    const sinceDate = lastState?.lastPolledAt
      ? new Date(lastState.lastPolledAt)
      : now;

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
      created: showNewRecords ? created : [],
      updated: showUpdatedRecords ? updated : [],
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
