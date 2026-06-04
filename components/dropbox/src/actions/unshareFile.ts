import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { unshareFileExamplePayload } from "../example-payloads";
import {
  connectionInput,
  fileId,
  shared_folder_id,
  teamMemberId,
  userType,
} from "../inputs";
import { checkDebug, handleDropboxError } from "../util";

export const unshareFile = action({
  display: {
    label: "Unshare File",
    description:
      "Remove all members from this file. Does not remove inherited members.",
  },
  perform: async (
    context,
    { dropboxConnection, teamMemberId, userType, fileId },
  ) => {
    checkDebug({ dropboxConnection, teamMemberId, userType, fileId }, context);
    const dbx = createAuthorizedClient(
      dropboxConnection,
      userType,
      teamMemberId,
    );
    try {
      const result = await dbx.sharingUnshareFile({
        file: fileId,
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
    fileId,
    userType,
    teamMemberId,
  },
  examplePayload: {
    data: unshareFileExamplePayload,
  },
});
