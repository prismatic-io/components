import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { searchFoldersExamplePayload } from "../example-payloads";
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
import { checkDebug, fetchAllSearchFolders, handleDropboxError } from "../util";

export const searchFolders = action({
  display: {
    label: "Search Folders",
    description: "Search for folders at the specified path",
  },
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
    query: {
      ...fileName,
      label: "Folder Name",
      comments: "The name of the folder to search for",
      example: "My Folder",
      required: true,
    },
    path: { ...directoryPath },
    fetchAll,
    cursor,
    limit,
    userType,
    teamMemberId,
  },
  examplePayload: {
    data: searchFoldersExamplePayload,
  },
});
