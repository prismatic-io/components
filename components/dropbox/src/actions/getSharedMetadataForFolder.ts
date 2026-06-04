import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { getSharedMetadataForFolderExamplePayload } from "../example-payloads";
import {
  connectionInput,
  fileId,
  shared_folder_id,
  teamMemberId,
  userType,
} from "../inputs";
import { checkDebug, handleDropboxError } from "../util";

export const getSharedMetadataForFolder = action({
  display: {
    label: "Get Shared Metadata for Folder",
    description: "Returns shared folder metadata.",
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
      const result = await dbx.sharingGetFolderMetadata({
        shared_folder_id: fileId,
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
    fileId: {
      ...fileId,
      label: "Shared Folder ID",
      comments: "The ID of the shared folder to retrieve metadata for",
      required: true,
      example: "84528192421",
    },
    userType,
    teamMemberId,
  },
  examplePayload: {
    data: getSharedMetadataForFolderExamplePayload,
  },
});
