import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { listTeamFoldersExamplePayload } from "../example-payloads";
import {
  connectionInput,
  cursor,
  directoryPath,
  fetchAll,
  limit,
} from "../inputs";
import { checkDebug, fetchAllTeamFolders, handleDropboxError } from "../util";

export const listTeamFolder = action({
  display: {
    label: "List Team's Folders",
    description: "List Team's Folder contents",
  },
  perform: async (context, params) => {
    checkDebug(params, context);
    const dbx = createAuthorizedClient(params.dropboxConnection);

    try {
      const data = await fetchAllTeamFolders(dbx, {
        limit: params.limit,
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
    fetchAll,
    cursor,
    limit,
  },
  examplePayload: {
    data: listTeamFoldersExamplePayload,
  },
});
