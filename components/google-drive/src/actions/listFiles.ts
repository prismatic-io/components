import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { driveId, pageToken, pageSize, connection, fields, query, fetchAll } from "../inputs";
import { getDriveQueryParams } from "../util";
import { fetchFiles } from "../helpers/pagination";

export const listFiles = action({
  display: {
    label: "List Files",
    description: "Lists all available files and directories",
  },
  perform: async (_context, params) => {
    const drive = createClient(params.connection);
    const data = await fetchFiles({
      drive,
      initialParams: {
        q: util.types.toString(params.query) || undefined,
        fields: util.types.toString(params.fields) || "*",
        pageToken: util.types.toString(params.pageToken) || undefined,
        pageSize: util.types.toInt(params.pageSize) || undefined,
        ...getDriveQueryParams(params.driveId),
      },
      fetchAll: params.fetchAll,
    });

    return {
      data,
    };
  },
  inputs: { connection, driveId, pageSize, pageToken, fields, query, fetchAll },
  examplePayload: {
    data: { files: [{ name: "example", description: "example" }] },
  },
});

export default listFiles;
