import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { listFolderExamplePayload } from "../example-payloads";
import {
  connectionInput,
  cursor,
  directoryPath,
  fetchAll,
  limit,
  recursive,
  teamMemberId,
  userType,
} from "../inputs";
import { checkDebug, fetchAllFolderEntries, handleDropboxError } from "../util";

export const listFolder = action({
  display: {
    label: "List Folder",
    description: "List Folder contents at the specified path",
  },
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
        limit: params.limit,
        recursive: params.recursive,
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
    path: directoryPath,
    recursive,
    fetchAll,
    cursor,
    limit,
    userType,
    teamMemberId,
  },
  examplePayload: {
    data: listFolderExamplePayload,
  },
});
