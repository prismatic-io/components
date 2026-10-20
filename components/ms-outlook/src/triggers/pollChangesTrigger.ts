import { pollingTrigger } from "@prismatic-io/spectral";
import { TRIGGER_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type {
  MessageChange,
  MessageChangesObject,
  PollingCursor,
  PollingState,
} from "../types";
import {
  partitionMessagesByTimestamp,
  readPollingWindow,
  resolveMessageChanges,
  resolvePollingStart,
  resolvePollingStream,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Messages",
    description:
      "Retrieves existing and ongoing mail messages for a specified Microsoft Outlook mail folder. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  allowsBranching: false,
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): MessageChange[] =>
      resolveMessageChanges(payload.body.data as MessageChangesObject),
    getNextPaginationState: (_context, { payload }): PollingCursor | null =>
      (payload.paginationState as PollingCursor | undefined) ?? null,
  },
  perform: async (
    context,
    payload,
    {
      connection,
      lookBackDate,
      pollFolderId,
      showNewMessages,
      showUpdatedMessages,
    },
  ) => {
    const now = new Date();
    const state = (context.polling.getState() ?? {}) as PollingState;
    const incoming = payload.paginationState as
      | Partial<PollingCursor>
      | undefined;
    const { sinceDate, isBackfill } = resolvePollingStart(
      state,
      lookBackDate,
      now,
    );
    const { position, classifySince } = resolvePollingStream(
      state,
      incoming,
      pollFolderId,
      sinceDate,
    );
    const skipFetch = !isBackfill && !showNewMessages && !showUpdatedMessages;
    const window = await readPollingWindow(connection, {
      position,
      folderId: pollFolderId,
      skipFetch,
      batching: context.batch?.enabled === true,
      debug: context.debug.enabled,
      now,
    });
    const { created, updated } = partitionMessagesByTimestamp(
      window.messages,
      new Date(classifySince),
    );
    const result: MessageChangesObject = {
      created: isBackfill || showNewMessages ? created : [],
      updated: isBackfill || showUpdatedMessages ? updated : [],
    };
    const { drained } = window;
    const next: PollingCursor | null = drained
      ? null
      : { ...window.position, classifySince, folderId: pollFolderId };
    context.polling.setState({
      ...window.position,
      ...(pollFolderId ? { folderId: pollFolderId } : {}),
      ...(drained ? {} : { classifySince }),
      lastPolledAt: drained ? window.position.watermark : classifySince,
      ...(isBackfill && !drained ? { backfillActive: true } : {}),
    } satisfies PollingState);
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Outlook messages from ${position.watermark}: ${window.messages.length} read → ${created.length} new, ${updated.length} updated, ${drained ? "stream drained" : "more pending"}`,
      );
    }
    return {
      payload: {
        ...payload,
        paginationState: next ?? undefined,
        body: { data: result },
      },
      polledNoChanges:
        result.created.length === 0 &&
        result.updated.length === 0 &&
        next === null &&
        !incoming,
    };
  },
});
