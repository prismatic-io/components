import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { getFileOrFolderMetadataExamplePayload } from "../example-payloads";
import {
  connectionInput,
  include_deleted,
  include_has_explicit_shared_members,
  include_media_info,
  path,
  shared_folder_id,
  teamMemberId,
  userType,
} from "../inputs";
import { checkDebug, handleDropboxError } from "../util";

export const getMetadata = action({
  display: {
    label: "Get Metadata for File or Folder",
    description: "Returns the metadata for a file or folder.",
  },
  perform: async (
    context,
    {
      dropboxConnection,
      teamMemberId,
      userType,
      include_deleted,
      include_has_explicit_shared_members,
      include_media_info,
      path,
    },
  ) => {
    checkDebug(
      {
        dropboxConnection,
        teamMemberId,
        userType,
        include_deleted,
        include_has_explicit_shared_members,
        include_media_info,
        path,
      },
      context,
    );
    const dbx = createAuthorizedClient(
      dropboxConnection,
      userType,
      teamMemberId,
    );
    try {
      const result = await dbx.filesGetMetadata({
        path,
        include_deleted,
        include_has_explicit_shared_members,
        include_media_info,
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
    path: {
      ...path,
      comments: "The path of a file or folder on Dropbox to get metadata for",
      example: "id:a4ayc_80_OEAAAAAAAAAYa || /Homework/math",
      required: true,
    },
    include_media_info,
    include_deleted,
    include_has_explicit_shared_members,
    userType,
    teamMemberId,
  },
  examplePayload: {
    data: getFileOrFolderMetadataExamplePayload,
  },
});
