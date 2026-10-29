import { pollingTrigger } from "@prismatic-io/spectral";
import { getAdobeSignClient } from "../client";
import {
  DEFAULT_BATCH_SIZE,
  POLL_BOOTSTRAP_WINDOW_MS,
  POLL_PAGE_SIZE,
} from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { PollingCursor, PollingState } from "../types";
import type { AdobeSignChangesObject, AdobeSignRecordChange } from "../util";
import {
  MAX_BATCHED_POLL_PAGES,
  fetchAgreementsModifiedSince,
  partitionAgreementsByTimestamp,
  resolvePollingRecordChanges,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Agreements",
    description:
      "Retrieves existing and ongoing agreements from Adobe Acrobat Sign. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): AdobeSignRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as AdobeSignChangesObject),
    getNextPaginationState: (_context, { payload }): PollingCursor | null =>
      (payload.paginationState as PollingCursor | undefined) ?? null,
  },
  perform: async (
    context,
    payload,
    { connection, lookBackDate, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date();
    const state = (context.polling.getState() ?? {}) as PollingState;
    const incoming = payload.paginationState as PollingCursor | undefined;
    const isBatching = context.batch?.enabled === true;
    const maxPages = isBatching ? MAX_BATCHED_POLL_PAGES : undefined;

    const lastPolledAt =
      state.lastPolledAt ??
      (lookBackDate
        ? new Date(lookBackDate).toISOString()
        : new Date(now.getTime() - POLL_BOOTSTRAP_WINDOW_MS).toISOString());
    const sinceDate = new Date(lastPolledAt);
    const isBackfill =
      incoming?.isBackfilling ??
      state.isBackfilling ??
      (!state.lastPolledAt && Boolean(lookBackDate));

    const client = getAdobeSignClient(connection, context.debug.enabled);
    const { records, truncated, latestModifiedDate, nextStartIndex } =
      await fetchAgreementsModifiedSince(client, lastPolledAt, {
        maxPages,
        resumeStartIndex: incoming?.resumeStartIndex ?? state.resumeStartIndex,
      });

    const { created, updated } = partitionAgreementsByTimestamp(
      records,
      sinceDate,
    );

    const drained = !truncated;
    const nearCeiling = nextStartIndex + POLL_PAGE_SIZE >= 10000;
    const shouldRebase = truncated && (!isBatching || nearCeiling);
    const rebasedPolledAt =
      shouldRebase && latestModifiedDate ? latestModifiedDate : lastPolledAt;

    const nextPaginationState: PollingCursor | null = drained
      ? null
      : shouldRebase
        ? { resumeStartIndex: 0, isBackfilling: isBackfill || undefined }
        : {
            resumeStartIndex: nextStartIndex,
            isBackfilling: isBackfill || undefined,
          };

    context.polling.setState({
      lastPolledAt: drained ? now.toISOString() : rebasedPolledAt,
      resumeStartIndex: drained || shouldRebase ? undefined : nextStartIndex,
      isBackfilling: drained ? undefined : isBackfill || undefined,
    } as PollingState);

    const result = {
      created: isBackfill || showNewRecords ? created : [],
      updated: isBackfill || showUpdatedRecords ? updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled agreements: ${records.length} fetched → ${created.length} new, ${updated.length} updated, ${drained ? "stream drained" : "more pending"}`,
      );
    }

    const totalMatched = result.created.length + result.updated.length;
    return {
      payload: {
        ...payload,
        paginationState: nextPaginationState ?? undefined,
        body: { data: result },
      },
      polledNoChanges:
        totalMatched === 0 && nextPaginationState === null && !incoming,
    };
  },
  examplePayload: pollChangesTriggerExamplePayload,
});
