import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { searchFoldersExamplePayload } from "../../examplePayloads";
import { searchFoldersInputs } from "../../inputs";
import { searchFoldersOutputSchema } from "../../outputSchemas";
import {
  checkDebug,
  fetchAllSearchFolders,
  handleDropboxError,
} from "../../util";
export const searchFolders = action({
  display: {
    label: "Search Folders",
    description: "Search for folders at the specified path",
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
      const data = await fetchAllSearchFolders(dbx, {
        query: params.query,
        limit: params.pagination.limit,
        path: params.path,
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
    data: searchFoldersExamplePayload,
  }),
  inputs: searchFoldersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchFoldersOutputSchema,
  }),
  examplePayload: {
    data: searchFoldersExamplePayload,
  },
});
