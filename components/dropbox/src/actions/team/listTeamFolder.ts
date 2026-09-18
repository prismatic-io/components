import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { listTeamFoldersExamplePayload } from "../../examplePayloads";
import { listTeamFolderInputs } from "../../inputs";
import { listTeamFolderOutputSchema } from "../../outputSchemas";
import {
  checkDebug,
  fetchAllTeamFolders,
  handleDropboxError,
} from "../../util";
export const listTeamFolder = action({
  display: {
    label: "List Team's Folders",
    description: "List team folders.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    checkDebug(params, context);
    const dbx = createAuthorizedClient(params.dropboxConnection);
    try {
      const data = await fetchAllTeamFolders(dbx, {
        limit: params.pagination.limit,
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
    data: listTeamFoldersExamplePayload,
  }),
  inputs: listTeamFolderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTeamFolderOutputSchema,
  }),
  examplePayload: {
    data: listTeamFoldersExamplePayload,
  },
});
