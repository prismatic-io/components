import type { TriggerBaseResult, TriggerPayload } from "@prismatic-io/spectral";
import type { Dropbox } from "dropbox";
import { MAX_BATCHED_PAGE_SIZE } from "../constants";
import type {
  DropboxEntry,
  DropboxRecordChange,
  ListChangesResult,
  SyncCursor,
  SyncSettings,
} from "../types";
export const resolvePollingRecordChanges = (
  data: ListChangesResult | undefined,
): DropboxRecordChange[] =>
  (data?.entries ?? []).map((record): DropboxRecordChange => {
    switch (record[".tag"]) {
      case "file":
        return { changeType: "file", record };
      case "folder":
        return { changeType: "folder", record };
      case "deleted":
        return { changeType: "deleted", record };
      default: {
        const unexpectedEntry: never = record;
        throw new Error(
          `Unexpected Dropbox entry tag "${unexpectedEntry[".tag"]}" in the polling trigger payload. This entry type is not yet supported.`,
        );
      }
    }
  });
export const fetchSyncPage = async (
  dbx: Dropbox,
  settings: SyncSettings,
  cursor: string | undefined,
  limit: number,
): Promise<ListChangesResult> => {
  const response = cursor
    ? await dbx.filesListFolderContinue({ cursor })
    : await dbx.filesListFolder({
        path: settings.path,
        recursive: settings.recursive,
        include_deleted: settings.includeDeleted,
        limit,
      });
  return response.result as ListChangesResult;
};
export const filterEntriesByLookBackDate = (
  entries: DropboxEntry[],
  lookBackDate: string,
): DropboxEntry[] => {
  if (!lookBackDate) {
    return entries;
  }
  const threshold = Date.parse(`${lookBackDate}T00:00:00.000Z`);
  if (Number.isNaN(threshold)) {
    return entries;
  }
  return entries.filter((entry) => {
    if (entry[".tag"] !== "file") {
      return true;
    }
    const modified = Date.parse(entry.server_modified);
    return Number.isNaN(modified) || modified >= threshold;
  });
};
export const buildSyncRound = (
  payload: TriggerPayload,
  page: ListChangesResult,
  settings: SyncSettings,
  stateKey: string,
): TriggerBaseResult<
  TriggerPayload & {
    body: {
      data: ListChangesResult;
    };
  }
> => {
  const position: SyncCursor = { cursor: page.cursor, ...settings };
  const nextCursor = page.has_more ? position : undefined;
  return {
    payload: {
      ...payload,
      paginationState: nextCursor,
      body: { data: page },
    },
    ...(nextCursor ? {} : { crossFlowState: { [stateKey]: position } }),
    polledNoChanges:
      page.entries.length === 0 && !nextCursor && !payload.paginationState,
  };
};
export const readSyncSettings = (params: {
  directoryPath: string;
  recursive: boolean;
  includeDeleted: boolean;
}): SyncSettings => ({
  path: params.directoryPath,
  recursive: params.recursive,
  includeDeleted: params.includeDeleted,
});
export const resolveSyncPageSize = (
  batchingEnabled: boolean,
  requested: number,
): number =>
  batchingEnabled ? Math.min(requested, MAX_BATCHED_PAGE_SIZE) : requested;
