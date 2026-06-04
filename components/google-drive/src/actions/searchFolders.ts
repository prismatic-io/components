import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  pageToken,
  pageSize,
  connection,
  fields,
  folderId,
  searchQuery,
  fetchAll,
  driveId,
} from "../inputs";
import { fetchFiles } from "../helpers/pagination";
import { getDriveQueryParams } from "../util";

export const searchFolders = action({
  display: {
    label: "Search Folders",
    description: "Search for an existing directory by Name",
  },
  perform: async (_context, params) => {
    const drive = createClient(params.connection);

    let finalQuery = "";
    if (params.folderId) {
      finalQuery += `'${params.folderId}' in parents and `;
    }

    finalQuery += `mimeType='application/vnd.google-apps.folder'`;

    if (params.searchQuery) {
      finalQuery += ` and name contains '${params.searchQuery}'`;
    }

    const data = await fetchFiles({
      drive,
      initialParams: {
        q: finalQuery,
        fields: util.types.toString(params.fields) || undefined,
        pageToken: util.types.toString(params.pageToken) || undefined,
        pageSize: util.types.toInt(params.pageSize) || undefined,
        ...getDriveQueryParams(params.driveId),
      },
      fetchAll: params.fetchAll,
    });

    if (data.files.length === 0) {
      throw new Error(`No results found for query: ${finalQuery}`);
    }

    return { data };
  },
  inputs: {
    connection,
    driveId,
    searchQuery,
    folderId: { ...folderId, label: "Parent Folder Id" },
    fields,
    pageSize,
    pageToken,
    fetchAll,
  },
  examplePayload: {
    data: { files: [{ name: "example", description: "example" }] },
  },
});

export default searchFolders;
