import { pollingTrigger } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { POLL_WINDOW_STEP_MS, POLLING_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type {
  PollingChangesObject,
  PollingState,
  SendgridMessageRecord,
  SendgridRecordChange,
} from "../types";
import {
  computePollWindow,
  fetchMessagesInWindow,
  resolvePollingRecordChanges,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Messages",
    description:
      "Retrieves existing and ongoing messages from the SendGrid Email Activity Feed. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: POLLING_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): SendgridRecordChange[] =>
      resolvePollingRecordChanges(
        payload.body.data as PollingChangesObject | undefined,
      ),
  },
  perform: async (context, payload, params) => {
    const nowMs = Date.now();
    const pollState = context.polling.getState() as PollingState;
    const { fromIso, toIso } = computePollWindow(
      pollState,
      nowMs,
      params.lookBackDate,
    );
    const client = createAuthorizedClient(params.sendGridConnection);
    const { records, truncated } = await fetchMessagesInWindow(
      client,
      fromIso,
      toIso,
    );
    const updated: SendgridMessageRecord[] =
      params.showUpdatedRecords !== false ? records : [];
    const created: SendgridMessageRecord[] = [];
    const fromMs = Date.parse(fromIso);
    const toMs = Date.parse(toIso);
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
