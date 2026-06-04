import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { listSharedLinksExamplePayload } from "../example-payloads";
import {
  connectionInput,
  cursor,
  direct_only,
  directoryPath,
  fetchAll,
  teamMemberId,
  userType,
} from "../inputs";
import { checkDebug, fetchAllSharedLinks, handleDropboxError } from "../util";

export const listSharedLinks = action({
  display: {
    label: "List Shared Links",
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
      const data = await fetchAllSharedLinks(dbx, {
        path: params.path,
        direct_only: params.direct_only,
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
    direct_only,
    fetchAll,
    cursor,
    userType,
    teamMemberId,
  },
  examplePayload: {
    data: listSharedLinksExamplePayload,
  },
});
