import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { searchFilesExamplePayload } from "../example-payloads";
import {
  connectionInput,
  cursor,
  directoryPath,
  fetchAll,
  fileName,
  limit,
  teamMemberId,
  userType,
} from "../inputs";
import { checkDebug, fetchAllSearchFiles, handleDropboxError } from "../util";

export const searchFiles = action({
  display: {
    label: "Search Files",
    description: "Search for files at the specified path",
  },
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
        limit: params.limit,
        path: params.path,
        fetchAll: params.fetchAll,
        cursor: params.cursor,
      });
      return { data };
    } catch (err) {
      handleDropboxError(err, [params.path]);
    }
  },
  inputs: {
    dropboxConnection: connectionInput,
    query: { ...fileName, required: true },
    path: directoryPath,
    fetchAll,
    cursor,
    limit,
    userType,
    teamMemberId,
  },
  examplePayload: {
    data: searchFilesExamplePayload,
  },
});
