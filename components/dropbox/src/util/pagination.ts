import type { Dropbox, DropboxResponse, files, sharing, team } from "dropbox";
import {
  MAX_LIST_FOLDER_LIMIT,
  MAX_SEARCH_LIMIT,
  MAX_SHARING_LIMIT,
} from "../constants";
import type { DropboxItemsKey, DropboxPaginatedResult } from "../types";
export const fetchAllFolderEntries = async (
  dbx: Dropbox,
  params: {
    path: string;
    limit?: number;
    recursive?: boolean;
    fetchAll: boolean;
    cursor?: string;
  },
): Promise<DropboxResponse<files.ListFolderResult>> => {
  const limit = params.fetchAll ? MAX_LIST_FOLDER_LIMIT : params.limit;
  return fetchAllDropboxPages(
    () =>
      dbx.filesListFolder({
        path: params.path,
        limit,
        recursive: params.recursive,
      }),
    (cursor) => dbx.filesListFolderContinue({ cursor }),
    params.fetchAll,
    params.cursor,
  );
};
export const fetchAllSharedFolders = async (
  dbx: Dropbox,
  params: {
    limit?: number;
    actions?: unknown;
    fetchAll: boolean;
    cursor?: string;
  },
): Promise<DropboxResponse<sharing.ListFoldersResult>> => {
  const limit = params.fetchAll ? MAX_SHARING_LIMIT : params.limit;
  return fetchAllDropboxPages(
    () =>
      dbx.sharingListFolders({
        limit,
        actions: params.actions as sharing.FolderAction[] | undefined,
      }),
    (cursor) => dbx.sharingListFoldersContinue({ cursor }),
    params.fetchAll,
    params.cursor,
  );
};
export const fetchAllSharedLinks = async (
  dbx: Dropbox,
  params: {
    path?: string;
    direct_only?: boolean;
    fetchAll: boolean;
    cursor?: string;
  },
): Promise<DropboxResponse<sharing.ListSharedLinksResult>> =>
  fetchAllDropboxPages(
    () =>
      dbx.sharingListSharedLinks({
        path: params.path,
        direct_only: params.direct_only,
      }),
    (cursor) => dbx.sharingListSharedLinks({ cursor }),
    params.fetchAll,
    params.cursor,
    "links",
  );
export const fetchAllTeamFolders = async (
  dbx: Dropbox,
  params: {
    limit?: number;
    fetchAll: boolean;
    cursor?: string;
  },
): Promise<DropboxResponse<team.TeamFolderListResult>> => {
  const limit = params.fetchAll ? MAX_SHARING_LIMIT : params.limit;
  return fetchAllDropboxPages(
    () => dbx.teamTeamFolderList({ limit }),
    (cursor) => dbx.teamTeamFolderListContinue({ cursor }),
    params.fetchAll,
    params.cursor,
  );
};
export const fetchAllSearchFiles = async (
  dbx: Dropbox,
  params: {
    query: string;
    limit?: number;
    path?: string;
    fetchAll: boolean;
    cursor?: string;
  },
): Promise<DropboxResponse<files.SearchV2Result>> => {
  const maxResults = params.fetchAll ? MAX_SEARCH_LIMIT : params.limit;
  return fetchAllDropboxPages(
    () =>
      dbx.filesSearchV2({
        query: params.query,
        options: {
          filename_only: true,
          max_results: maxResults,
          path: params.path,
        },
      }),
    (cursor) => dbx.filesSearchContinueV2({ cursor }),
    params.fetchAll,
    params.cursor,
    "matches",
  );
};
export const fetchAllSearchFolders = async (
  dbx: Dropbox,
  params: {
    query: string;
    limit?: number;
    path?: string;
    fetchAll: boolean;
    cursor?: string;
  },
): Promise<DropboxResponse<files.SearchV2Result>> => {
  const maxResults = params.fetchAll ? MAX_SEARCH_LIMIT : params.limit;
  return fetchAllDropboxPages(
    () =>
      dbx.filesSearchV2({
        query: params.query,
        options: {
          filename_only: false,
          max_results: maxResults,
          path: params.path,
        },
      }),
    (cursor) => dbx.filesSearchContinueV2({ cursor }),
    params.fetchAll,
    params.cursor,
    "matches",
  );
};
export const fetchAllDropboxPages = async <T extends DropboxPaginatedResult>(
  fetchFirst: () => Promise<T>,
  fetchContinue: (cursor: string) => Promise<T>,
  fetchAll: boolean,
  cursor?: string,
  itemsKey: DropboxItemsKey = "entries",
): Promise<T> => {
  if (!fetchAll) {
    return cursor ? fetchContinue(cursor) : fetchFirst();
  }
  const allItems: unknown[] = [];
  let hasMore = true;
  let cursorToken: string | undefined;
  let lastResponse: T;
  do {
    lastResponse = cursorToken
      ? await fetchContinue(cursorToken)
      : await fetchFirst();
    const result = lastResponse.result as Record<string, unknown>;
    allItems.push(...((result[itemsKey] as unknown[]) || []));
    hasMore = !!result.has_more;
    cursorToken = result.cursor as string | undefined;
  } while (hasMore && cursorToken);
  return {
    ...lastResponse,
    result: {
      ...lastResponse.result,
      [itemsKey]: allItems,
      has_more: false,
    },
  };
};
