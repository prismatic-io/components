import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { driveId, pageToken, pageSize, connection, fields, folderId, fetchAll } from "../inputs";
import { getDriveQueryParams } from "../util";
import { fetchFiles } from "../helpers/pagination";

export const listFolders = action({
  display: {
    label: "List Folders",
    description: "Lists all available directories",
  },
  perform: async (_context, params) => {
    const drive = createClient(params.connection);

    const data = await fetchFiles({
      drive,
      initialParams: {
        q: util.types.toString(params.folderId)
          ? `'${params.folderId}' in parents and mimeType='application/vnd.google-apps.folder'`
          : "mimeType='application/vnd.google-apps.folder'",
        ...getDriveQueryParams(params.driveId),
        fields: util.types.toString(params.fields) || undefined,
        pageToken: util.types.toString(params.pageToken) || undefined,
        pageSize: util.types.toInt(params.pageSize) || undefined,
      },
      fetchAll: params.fetchAll,
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    driveId,
    pageSize,
    pageToken,
    fields,
    folderId,
    fetchAll,
  },
  examplePayload: {
    data: { files: [{ name: "example", description: "example" }] },
  },
});

export default listFolders;
