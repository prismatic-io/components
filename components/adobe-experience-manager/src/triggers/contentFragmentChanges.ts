import { pollingTrigger } from "@prismatic-io/spectral";
import { createAemClient } from "../client";
import { DEFAULT_BATCH_SIZE, DEFAULT_DAM_ROOT } from "../constants";
import { contentFragmentChangesExamplePayload } from "../examplePayloads";
import { contentFragmentChangesInputs } from "../inputs";
import type {
  AemChangeItem,
  AemPollingChangesObject,
  PollingState,
  PollWindowCursor,
} from "../types";
import {
  buildContentFragmentTriggerFilter,
  classifyChange,
  listChangedContentFragments,
  nextPollingState,
  resolveAemChangeItems,
  resolvePollWindow,
  toContentFragmentRecord,
  windowNow,
} from "../utils";

export const contentFragmentChanges = pollingTrigger({
  display: {
    label: "New and Updated Fragments",
    description:
      "Retrieves existing and ongoing content fragments from Adobe Experience Manager. Load history once, check for changes on a schedule, or both.",
  },
  inputs: contentFragmentChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): AemChangeItem[] =>
      resolveAemChangeItems(payload.body.data as AemPollingChangesObject | undefined),
    getNextPaginationState: (_context, { payload }): PollWindowCursor | null =>
      (payload.paginationState as PollWindowCursor | undefined) ?? null,
  },
  perform: async (context, payload, params) => {
    const isBatching = context.batch?.enabled === true;
    const incoming = payload.paginationState as PollWindowCursor | undefined;
    const state = (context.polling.getState() ?? {}) as PollingState;
    const window = resolvePollWindow(state, incoming, params.lookBackDate, windowNow());
    const windowIsEmpty = window.windowStart >= window.windowEnd;

    const client = createAemClient(params.connection, context.debug.enabled);
    const { records, cursor } = windowIsEmpty
      ? { records: [], cursor: undefined }
      : await listChangedContentFragments(
          client,
          buildContentFragmentTriggerFilter(params),
          window,
          isBatching,
        );
    const nextCursor: PollWindowCursor | undefined = cursor
      ? { windowStart: window.windowStart, windowEnd: window.windowEnd, cursor }
      : undefined;

    context.polling.setState(nextPollingState(state, window, nextCursor));

    const scope = params.path ?? DEFAULT_DAM_ROOT;
    const items = records.map((fragment): AemChangeItem => {
      const record = toContentFragmentRecord(fragment, scope, params.publishBaseUrl);
      return {
        changeType: classifyChange(record, window.windowStart, window.isInitialSync),
        record,
      };
    });

    if (context.debug.enabled) {
      context.logger.debug(
        `Content fragments ${window.windowStart} to ${window.windowEnd}: ${items.length} changed; ${nextCursor ? "more pages remain" : "window drained"}`,
      );
    }

    return {
      payload: { ...payload, paginationState: nextCursor, body: { data: { items } } },
      polledNoChanges: items.length === 0 && !nextCursor && !incoming,
    };
  },
  examplePayload: contentFragmentChangesExamplePayload,
});
