import { pollingTrigger } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { MAX_LIST_FOLDER_LIMIT } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesOnDeployInputs, pollChangesTriggerInputs } from "../inputs";
import type {
  DropboxRecordChange,
  ListChangesResult,
  SyncCursor,
} from "../types";
import {
  buildSyncRound,
  cleanInitialSyncPageSize,
  fetchSyncPage,
  filterEntriesByLookBackDate,
  getLegacyStateKey,
  getSyncCursorStateKey,
  readSyncSettings,
  resolveListChangesCursor,
  resolvePollingRecordChanges,
  resolveSyncCursor,
  resolveSyncPageSize,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Files",
    description:
      "Checks for new and updated files on a configured schedule. Set a Look-back Date to sync the folder's existing files once when the instance is deployed.",
  },
  inputs: pollChangesTriggerInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50, concurrentBatchLimit: 1 },
  triggerResolver: {
    resolveItems: (_context, { payload }): DropboxRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as ListChangesResult),
    getNextPaginationState: (_context, { payload }): SyncCursor | null =>
      (payload.paginationState as SyncCursor | undefined) ?? null,
  },
  onDeployPerform: async (context, payload, params) => {
    const settings = readSyncSettings(params);
    const dbx = createAuthorizedClient(
      params.dropboxConnection,
      params.userType,
      params.teamMemberId,
    );
    const stateKey = getSyncCursorStateKey(context);
    const incoming = payload.paginationState as SyncCursor | undefined;
    const lookBackDate = String(params.lookBackDate ?? "");
    if (!lookBackDate) {
      const baseline = await dbx.filesListFolderGetLatestCursor({
        path: settings.path,
        recursive: settings.recursive,
        include_deleted: settings.includeDeleted,
        limit: MAX_LIST_FOLDER_LIMIT,
      });
      return buildSyncRound(
        payload,
        { entries: [], cursor: baseline.result.cursor, has_more: false },
        settings,
        stateKey,
      );
    }
    const page = await fetchSyncPage(
      dbx,
      settings,
      incoming?.cursor,
      resolveSyncPageSize(
        context.batch?.enabled === true,
        cleanInitialSyncPageSize(params.initialSyncPageSize),
      ),
    );
    const filtered: ListChangesResult = {
      ...page,
      entries: filterEntriesByLookBackDate(page.entries, lookBackDate),
    };
    if (context.debug?.enabled) {
      context.logger.debug(
        `Initial sync ${incoming ? "continued" : "started"} for ${settings.path || "the account root"} from ${lookBackDate}: ${page.entries.length} entries read, ${filtered.entries.length} within the look-back window, ${page.has_more ? "more pages remain" : "backfill complete"}`,
      );
    }
    return buildSyncRound(payload, filtered, settings, stateKey);
  },
  onDeployResolver: {
    inputs: pollChangesOnDeployInputs,
    resolveItems: (_context, { payload }): DropboxRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as ListChangesResult),
    getNextPaginationState: (_context, { payload }): SyncCursor | null =>
      (payload.paginationState as SyncCursor | undefined) ?? null,
  },
  perform: async (context, payload, params) => {
    const settings = readSyncSettings(params);
    const dbx = createAuthorizedClient(
      params.dropboxConnection,
      params.userType,
      params.teamMemberId,
    );
    const incoming = payload.paginationState as SyncCursor | undefined;
    const established = resolveListChangesCursor(context, settings);
    const cursor =
      incoming?.cursor ??
      established.value?.cursor ??
      resolveSyncCursor(context, settings)?.cursor;
    const stateKey = established.key;
    const legacyCleanup = established.isLegacy
      ? { instanceState: { [getLegacyStateKey(context)]: null } }
      : {};
    if (!cursor) {
      const baseline = await dbx.filesListFolderGetLatestCursor({
        path: settings.path,
        recursive: settings.recursive,
        include_deleted: settings.includeDeleted,
        limit: resolveSyncPageSize(
          context.batch?.enabled === true,
          MAX_LIST_FOLDER_LIMIT,
        ),
      });
      context.logger.info(
        "First time running, or settings have changed. Subsequent runs will show changes that occurred since the previous run.",
      );
      return {
        ...buildSyncRound(
          payload,
          { entries: [], cursor: baseline.result.cursor, has_more: false },
          settings,
          stateKey,
        ),
        ...legacyCleanup,
      };
    }
    const page = await fetchSyncPage(
      dbx,
      settings,
      cursor,
      MAX_LIST_FOLDER_LIMIT,
    );
    if (context.debug?.enabled) {
      context.logger.debug(
        `Polled ${settings.path || "the account root"}: ${page.entries.length} entries, ${page.has_more ? "more pages remain" : "caught up"}`,
      );
    }
    return {
      ...buildSyncRound(payload, page, settings, stateKey),
      ...legacyCleanup,
    };
  },
});
