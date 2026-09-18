import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { unshareFileExamplePayload } from "../../examplePayloads";
import { shared_folder_id, unshareFileInputs } from "../../inputs";
import { checkDebug, handleDropboxError } from "../../util";
export const unshareFile = action({
  display: {
    label: "Unshare File",
    description:
      "Remove all members from this file. Does not remove inherited members.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: unshareFileExamplePayload,
  }),
  inputs: unshareFileInputs,
  examplePayload: {
    data: unshareFileExamplePayload,
  },
});
