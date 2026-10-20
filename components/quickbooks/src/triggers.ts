import {
  pollingTrigger,
  type TriggerPayload,
  trigger,
} from "@prismatic-io/spectral";
import { DEFAULT_BATCH_SIZE, POLL_RESOURCE_CONFIG } from "./constants";
import { pollChangesExamplePayload } from "./examplePayloads/polling";
import { connectionInput } from "./inputs";
import { pollChangesInputs } from "./inputs/polling";
import type { PollingCursor, PollingState, QuickBooksRecord } from "./types";
import { parseQuickBooksWebhook, parseWebhookBody } from "./util";
import type {
  QuickBooksChangesObject,
  QuickBooksRecordChange,
} from "./util/polling";
import {
  MAX_BATCHED_POLL_PAGES,
  MAX_POLL_PAGES,
  fetchQuickBooksRecordsSince,
  resolvePollingRecordChanges,
} from "./util/polling";
export const webhook = trigger({
  display: {
    label: "Entity Change Events",
    description:
      "Receive webhook notifications from QuickBooks when entity changes occur.",
  },
  perform: async (context, payload) => {
    const { logger } = context;
    const webhookData = parseWebhookBody(payload);
    const normalizedOutput = parseQuickBooksWebhook(webhookData, logger);
    logger.info(
      `Processed QuickBooks webhook: ${normalizedOutput.eventCount} event(s), ` +
        `format: ${normalizedOutput.format}, ` +
        `first event: ${normalizedOutput.entity}.${normalizedOutput.operation}`,
    );
    const finalPayload: TriggerPayload = {
      ...payload,
      body: {
        ...payload.body,
        data: normalizedOutput,
      },
    };
    return Promise.resolve({
      payload: finalPayload,
    });
  },
  inputs: { connection: connectionInput },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a selected QuickBooks entity type. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: pollChangesExamplePayload,
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): QuickBooksRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as QuickBooksChangesObject),
    getNextPaginationState: (_context, { payload }): PollingCursor | null =>
      (payload.paginationState as PollingCursor | undefined) ?? null,
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const state = (context.polling.getState() ?? {}) as PollingState;
    const incoming = payload.paginationState as PollingCursor | undefined;
    const lastPolledAt =
      state.lastPolledAt ??
      (params.lookBackDate ? new Date(params.lookBackDate).toISOString() : now);
    const isBackfill =
      incoming?.isBackfilling ??
      state.isBackfilling ??
      (!state.lastPolledAt && Boolean(params.lookBackDate));
    const windowStart = incoming?.windowStart ?? state.windowStart ?? now;
    const isBatching = context.batch?.enabled === true;
    const maxPages = isBatching ? MAX_BATCHED_POLL_PAGES : MAX_POLL_PAGES;
    const config = POLL_RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }
    const { records, truncated, nextPosition } =
      await fetchQuickBooksRecordsSince(
        params.connection,
        config.entity,
        lastPolledAt,
        context.debug.enabled,
        {
          maxPages,
          resumePosition: incoming?.resumePosition ?? state.resumePosition,
        },
      );
    const lastPolledAtDate = new Date(lastPolledAt);
    const created: QuickBooksRecord[] = [];
    const updated: QuickBooksRecord[] = [];
    for (const record of records) {
      const createTime = record.MetaData?.CreateTime;
      const createdAtDate =
        typeof createTime === "string" ? new Date(createTime) : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      if (isNew && (isBackfill || params.showNewRecords !== false))
        created.push(record);
      else if (!isNew && (isBackfill || params.showUpdatedRecords !== false))
        updated.push(record);
    }
    const drained = !truncated;
    const nextPaginationState: PollingCursor | null = drained
      ? null
      : {
          resumePosition: nextPosition,
          isBackfilling: isBackfill || undefined,
          windowStart,
        };
    context.polling.setState({
      lastPolledAt: drained ? windowStart : lastPolledAt,
      resumePosition: drained ? undefined : nextPosition,
      isBackfilling: drained ? undefined : isBackfill || undefined,
      windowStart: drained ? undefined : windowStart,
    } as PollingState);
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled QuickBooks ${config.entity}: ${records.length} fetched, ${created.length} created, ${updated.length} updated, ${drained ? "stream drained" : "more pending"}`,
      );
    }
    const totalMatched = created.length + updated.length;
    return {
      payload: {
        ...payload,
        paginationState: nextPaginationState ?? undefined,
        body: { data: { created, updated } },
      },
      polledNoChanges:
        totalMatched === 0 && nextPaginationState === null && !incoming,
    };
  },
});
export default { webhook, pollChangesTrigger };
