import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { unshareFolderExamplePayload } from "../example-payloads";
import {
  connectionInput,
  leave_a_copy,
  shared_folder_id,
  teamMemberId,
  userType,
} from "../inputs";
import { checkDebug, handleDropboxError } from "../util";

export const unshareFolder = action({
  display: {
    label: "Unshare Folder",
    description:
      "Allows a shared folder owner to unshare the folder. Unshare will not work in following cases: The shared folder contains shared folders OR the shared folder is inside another shared folder.",
  },
  perform: async (
    context,
    {
      dropboxConnection,
      leave_a_copy,
      shared_folder_id,
      teamMemberId,
      userType,
    },
  ) => {
    checkDebug(
      {
        dropboxConnection,
        leave_a_copy,
        shared_folder_id,
        teamMemberId,
        userType,
      },
      context,
    );
    const dbx = createAuthorizedClient(
      dropboxConnection,
      userType,
      teamMemberId,
    );
    try {
      const result = await dbx.sharingUnshareFolder({
        shared_folder_id,
        leave_a_copy,
      });
      return {
        data: result,
      };
    } catch (err) {
      handleDropboxError(err, [shared_folder_id]);
    }
  },
  inputs: {
    dropboxConnection: connectionInput,
    shared_folder_id,
    leave_a_copy,
    userType,
    teamMemberId,
  },
  examplePayload: {
    data: unshareFolderExamplePayload,
  },
});
