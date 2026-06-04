import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  pageToken,
  pageSize,
  connection,
  fields,
  folderId,
  searchQuery,
  query,
  filesContainingSearchQuery,
  fetchAll,
  driveId,
} from "../inputs";
import { fetchFiles } from "../helpers/pagination";
import { getDriveQueryParams } from "../util";

export const searchFiles = action({
  display: {
    label: "Search Files",
    description: "Search for an existing file by Name",
  },
  perform: async (_context, params) => {
    const drive = createClient(params.connection);
    let finalQuery = "";

    const nameQuery = params.searchQuery
      ? params.filesContainingSearchQuery
        ? `name contains '${params.searchQuery}'`
        : `name = '${params.searchQuery}'`
      : null;

    if (params.folderId) {
      finalQuery += `'${params.folderId}' in parents`;
    }

    if (nameQuery) {
      if (params.folderId) {
        finalQuery += ` and `;
      }
      finalQuery += nameQuery;
    }

    const customQuery = util.types.toString(params.query);
    if (customQuery) {
      if (params.folderId || nameQuery) {
        finalQuery += ` and `;
      }
      finalQuery += customQuery;
    }

    const data = await fetchFiles({
      drive,
      initialParams: {
        q: finalQuery,
        fields: params.fields || undefined,
        pageToken: params.pageToken || undefined,
        pageSize: params.pageSize || undefined,
        ...getDriveQueryParams(params.driveId),
      },
      fetchAll: params.fetchAll,
    });

    if (data.files.length === 0) {
      throw new Error(`No results found for query: ${finalQuery}`);
    }
    return {
      data,
    };
  },
  inputs: {
    connection,
    driveId,
    searchQuery,
    filesContainingSearchQuery,
    folderId: { ...folderId, label: "Parent Folder Id" },
    query,
    fields,
    pageSize,
    pageToken,
    fetchAll,
  },
});

export default searchFiles;
