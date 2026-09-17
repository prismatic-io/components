import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { FOLDER_QUERY } from "../../constants";
import { listFoldersInputs } from "../../inputs";
import { listFoldersOutputSchema } from "../../outputSchemas";
import { escapeDriveQueryValue, getDriveQueryParams } from "../../util";
import { fetchFiles } from "../../util/pagination";
import { listFoldersExamplePayload } from "../../examplePayloads";
export const listFolders = action({
  display: {
    label: "List Folders",
    description: "Lists all available directories",
  },
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const drive = createClient(params.connection);
    const data = await fetchFiles({
      drive,
      initialParams: {
        q: params.folderId
          ? `'${escapeDriveQueryValue(params.folderId)}' in parents and ${FOLDER_QUERY}`
          : FOLDER_QUERY,
        ...getDriveQueryParams(params.driveId),
        fields: params.fields,
        pageToken: params.pagination.pageToken,
        pageSize: params.pagination.pageSize,
      },
      fetchAll: params.fetchAll,
    });
    return {
      data,
    };
  },
  inputs: listFoldersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFoldersOutputSchema,
  }),
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listFoldersExamplePayload,
  examplePayload: listFoldersExamplePayload,
});
export default listFolders;
