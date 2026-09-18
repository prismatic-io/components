import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { listSharedFoldersExamplePayload } from "../../examplePayloads";
import { listSharingFolderInputs } from "../../inputs";
import { listSharingFolderOutputSchema } from "../../outputSchemas";
import {
  checkDebug,
  fetchAllSharedFolders,
  handleDropboxError,
} from "../../util";
export const listSharingFolder = action({
  display: {
    label: "List Shared Folders",
    description: "List shared folders in the account.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    checkDebug(params, context);
    const dbx = createAuthorizedClient(params.dropboxConnection);
    try {
      const data = await fetchAllSharedFolders(dbx, {
        limit: params.pagination.limit,
        actions: params.folderActions,
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
    data: listSharedFoldersExamplePayload,
  }),
  inputs: listSharingFolderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSharingFolderOutputSchema,
  }),
  examplePayload: {
    data: listSharedFoldersExamplePayload,
  },
});
