import { pollingTrigger } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import {
  OVERLAP_MS,
  POLL_WINDOW_STEP_MS,
  RETENTION_WINDOW_MS,
} from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { PollingState, SendgridMessageRecord } from "../types";
import { fetchMessagesInWindow } from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Messages",
    description:
      "Checks for new and updated messages in SendGrid on a configured schedule.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const nowMs = Date.now();
    const pollState = context.polling.getState() as PollingState;
    const retentionFloorMs = nowMs - RETENTION_WINDOW_MS;
    const persistedMs = pollState?.lastPolledAt
      ? Date.parse(pollState.lastPolledAt)
      : Number.NaN;
    const fromMs = Number.isFinite(persistedMs)
      ? Math.max(persistedMs, retentionFloorMs)
      : retentionFloorMs;
    const overlapMs = nowMs - OVERLAP_MS;
    const toMs = Math.min(fromMs + POLL_WINDOW_STEP_MS, overlapMs);
    const fromIso = new Date(fromMs).toISOString();
    const toIso = new Date(toMs).toISOString();
    const client = createAuthorizedClient(params.sendGridConnection);
    const { records, truncated } = await fetchMessagesInWindow(
      client,
      fromIso,
      toIso,
    );
    const updated: SendgridMessageRecord[] =
      params.showUpdatedRecords !== false ? records : [];
    const created: SendgridMessageRecord[] = [];
    const nextCursorMs = truncated ? fromMs + POLL_WINDOW_STEP_MS : toMs;
    context.polling.setState({
      lastPolledAt: new Date(nextCursorMs).toISOString(),
    });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled SendGrid /v3/messages window [${fromIso}, ${toIso}]: ` +
          `${records.length} fetched, truncated=${truncated}, ` +
          `nextCursor=${new Date(nextCursorMs).toISOString()}`,
      );
    }
    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
