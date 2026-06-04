import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { listSharedFoldersExamplePayload } from "../example-payloads";
import {
  connectionInput,
  cursor,
  directoryPath,
  fetchAll,
  folderActions,
  limit,
} from "../inputs";
import { checkDebug, fetchAllSharedFolders, handleDropboxError } from "../util";

export const listSharingFolder = action({
  display: {
    label: "List Shared Folders",
    description: "List Shared Folders contents",
  },
  perform: async (context, params) => {
    checkDebug(params, context);
    const dbx = createAuthorizedClient(params.dropboxConnection);

    try {
      const data = await fetchAllSharedFolders(dbx, {
        limit: params.limit,
        actions: params.folderActions,
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
    path: { ...directoryPath, required: true },
    folderActions,
    fetchAll,
    cursor,
    limit,
  },
  examplePayload: {
    data: listSharedFoldersExamplePayload,
  },
});
