import { pollingTrigger } from "@prismatic-io/spectral";
import { createAemClient } from "../client";
import { DEFAULT_BATCH_SIZE, DEFAULT_DAM_ROOT } from "../constants";
import { assetChangesExamplePayload } from "../examplePayloads";
import { assetChangesInputs } from "../inputs";
import type {
  AemChangeItem,
  AemPollingChangesObject,
  PollingState,
  PollWindowCursor,
} from "../types";
import {
  classifyChange,
  listChangedAssets,
  nextPollingState,
  resolveAemChangeItems,
  resolvePollWindow,
  toAssetRecord,
  windowNow,
} from "../utils";

export const assetChanges = pollingTrigger({
  display: {
    label: "New and Updated Assets",
    description:
      "Retrieves existing and ongoing assets from Adobe Experience Manager. Load history once, check for changes on a schedule, or both.",
  },
  inputs: assetChangesInputs,
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
      : await listChangedAssets(client, params, window, isBatching);
    const nextCursor: PollWindowCursor | undefined = cursor
      ? { windowStart: window.windowStart, windowEnd: window.windowEnd, cursor }
      : undefined;

    context.polling.setState(nextPollingState(state, window, nextCursor));

    const scope = params.folderIds.length ? params.folderIds.join(",") : DEFAULT_DAM_ROOT;
    const items = records.map((hit): AemChangeItem => {
      const record = toAssetRecord(hit, scope, params.publishBaseUrl);
      return {
        changeType: classifyChange(record, window.windowStart, window.isInitialSync),
        record,
      };
    });

    if (context.debug.enabled) {
      context.logger.debug(
        `Assets ${window.windowStart} to ${window.windowEnd}: ${items.length} changed; ${nextCursor ? "more pages remain" : "window drained"}`,
      );
    }

    return {
      payload: { ...payload, paginationState: nextCursor, body: { data: { items } } },
      polledNoChanges: items.length === 0 && !nextCursor && !incoming,
    };
  },
  examplePayload: assetChangesExamplePayload,
});
