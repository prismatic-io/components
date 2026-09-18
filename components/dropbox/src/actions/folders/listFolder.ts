import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { listFolderExamplePayload } from "../../examplePayloads";
import { listFolderInputs } from "../../inputs";
import { listFolderOutputSchema } from "../../outputSchemas";
import {
  checkDebug,
  fetchAllFolderEntries,
  handleDropboxError,
} from "../../util";
export const listFolder = action({
  display: {
    label: "List Folder",
    description: "List Folder contents at the specified path",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    checkDebug(params, context);
    const dbx = createAuthorizedClient(
      params.dropboxConnection,
      params.userType,
      params.teamMemberId,
    );
    try {
      const data = await fetchAllFolderEntries(dbx, {
        path: params.path,
        limit: params.pagination.limit,
        recursive: params.recursive,
        fetchAll: params.fetchAll,
        cursor: params.pagination.cursor,
      });
      return { data };
    } catch (err) {
      handleDropboxError(err, [params.path]);
    }
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listFolderExamplePayload,
  }),
  inputs: listFolderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFolderOutputSchema,
  }),
  examplePayload: {
    data: listFolderExamplePayload,
  },
});
