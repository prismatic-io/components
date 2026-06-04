import { type ActionContext, util } from "@prismatic-io/spectral";
import { type Dropbox, DropboxResponseError } from "dropbox";
import type {
  DropboxEntry,
  DropboxItemsKey,
  DropboxPaginatedResult,
  StringTag,
} from "./interfaces";

export const handleDropboxError = (err, paths = []) => {
  
  if (err instanceof DropboxResponseError) {
    switch (err.status) {
      case 401:
        throw new Error(
          `An error occurred with authorization. You may not have permissions to perform this task. Error: ${JSON.stringify(
            err,
          )}`,
        );
      case 409:
        throw new Error(
          `An error related to file paths occurred. You may be trying to create a directory that already exists, or you may be referencing a file or directory that does not exist. File paths: "${paths}". Error: ${JSON.stringify(
            err,
          )}`,
        );
      case 429:
        throw new Error(
          `Dropbox reports that your app has been rate-limited. Please slow the number of requests you are making. Error: ${JSON.stringify(
            err,
          )}`,
        );
      case 500:
        throw new Error(
          `An error occurred on Dropbox's side. Is the Dropbox API down? https://status.dropbox.com/ Error: ${JSON.stringify(
            err,
          )}`,
        );
    }
  }
  throw new Error(`An unknown error occurred. Error: ${JSON.stringify(err)}`);
};

export const validatePath = (path) => {
  if (!util.types.toString(path).startsWith("/")) {
    throw new Error(
      `Dropbox requires all file paths to start with a leading "/". The file path "${path}" does not start with a "/".`,
    );
  }
};

export default { validatePath };

export const getHeadersRawRequest = (dropboxToken, httpClientInputs) => {
  const headers = {
    Authorization: `Bearer ${dropboxToken}`,
  };
  if (httpClientInputs.headers.length > 0) {
    let contentTypeHeader = null;
    httpClientInputs.headers.forEach((header) => {
      const headerName = header.key.toLowerCase();
      const headerValue = header.value;
      if (headerName === "content-type") {
        contentTypeHeader = headerValue;
      }
    });
    headers["Content-Type"] = contentTypeHeader || "";
  } else {
    headers["Content-Type"] = "";
  }
  return headers;
};

export const getUserTypeHeader = (userType, teamMemberId) => {
  const headers = {};
  if (userType === "user") {
    headers["Dropbox-API-Select-User"] = teamMemberId;
  } else if (userType === "admin") {
    headers["Dropbox-API-Select-Admin"] = teamMemberId;
  } else {
    throw new Error("Invalid user type. Must be 'user' or 'admin'.");
  }
  return headers;
};

export const cleanString = (value: unknown) =>
  util.types.toString(value).replace(/\/$/, "");

export const cleanActionArray = (value: unknown): StringTag[] => {
  if (Array.isArray(value) && value.length > 0) {
    return value.map((item) => ({ ".tag": util.types.toString(item) }));
  }
  return undefined;
};

export const cleanStringWithTag = (value: unknown): StringTag => {
  if (value) {
    return { ".tag": util.types.toString(value) };
  }
  return undefined;
};

export const checkDebug = (params: any, context: ActionContext) => {
  if (context.debug.enabled) {
    context.logger.debug("Params", params);
  }
};

export const getEntries = (
  filePaths,
  dynamicPaths,
): Array<{ path: string }> => {
  let entries = filePaths.map((path) => {
    validatePath(path);
    return { path };
  });

  if (dynamicPaths && Array.isArray(dynamicPaths)) {
    entries = entries.concat(
      dynamicPaths.map((path) => {
        validatePath(path);
        return { path };
      }),
    );
  }
  return entries;
};

export const toOptionalString = (value: unknown) => {
  if (value) {
    return util.types.toString(value);
  }
  return undefined;
};

export const filterEntries = (
  entries: DropboxEntry[],
  filter: string,
): DropboxEntry[] => {
  return entries.filter(({ ".tag": tag }) => tag === filter);
};

export function getBase64FromUrl(url: string): string {
  const lastPathSegmentMatch = url.match(/\/([^/]+)$/);
  return lastPathSegmentMatch ? lastPathSegmentMatch[1] : "";
}

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

const MAX_LIST_FOLDER_LIMIT = 2000;
const MAX_SHARING_LIMIT = 1000;
const MAX_SEARCH_LIMIT = 1000;

export const fetchAllFolderEntries = async (
  dbx: Dropbox,
  params: {
    path: string;
    limit?: number;
    recursive?: boolean;
    fetchAll: boolean;
    cursor?: string;
  },
) => {
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
) => {
  const limit = params.fetchAll ? MAX_SHARING_LIMIT : params.limit;
  return fetchAllDropboxPages(
    () =>
      dbx.sharingListFolders({
        limit,
        actions: params.actions as any,
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
) =>
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
  params: { limit?: number; fetchAll: boolean; cursor?: string },
) => {
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
) => {
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
) => {
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
