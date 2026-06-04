import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { getSharedMetadataForFileExamplePayload } from "../example-payloads";
import {
  connectionInput,
  fileId,
  shared_folder_id,
  teamMemberId,
  userType,
} from "../inputs";
import { checkDebug, handleDropboxError } from "../util";

export const getSharedMetadataForFile = action({
  display: {
    label: "Get Shared Metadata for File",
    description: "Returns shared file metadata.",
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
      const result = await dbx.sharingGetFileMetadata({
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
    data: getSharedMetadataForFileExamplePayload,
  },
});
