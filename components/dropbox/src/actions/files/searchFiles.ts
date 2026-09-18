import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { searchFilesExamplePayload } from "../../examplePayloads";
import { searchFilesInputs } from "../../inputs";
import { searchFilesOutputSchema } from "../../outputSchemas";
import {
  checkDebug,
  fetchAllSearchFiles,
  handleDropboxError,
} from "../../util";
export const searchFiles = action({
  display: {
    label: "Search Files",
    description: "Search for files at the specified path",
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
      const data = await fetchAllSearchFiles(dbx, {
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
    data: searchFilesExamplePayload,
  }),
  inputs: searchFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchFilesOutputSchema,
  }),
  examplePayload: {
    data: searchFilesExamplePayload,
  },
});
