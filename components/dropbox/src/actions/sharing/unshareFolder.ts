import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { unshareFolderExamplePayload } from "../../examplePayloads";
import { unshareFolderInputs } from "../../inputs";
import { unshareFolderOutputSchema } from "../../outputSchemas";
import { checkDebug, handleDropboxError } from "../../util";
export const unshareFolder = action({
  display: {
    label: "Unshare Folder",
    description:
      "Allows a shared folder owner to unshare the folder. Unshare will not work in the following cases: The shared folder contains shared folders OR the shared folder is inside another shared folder.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: unshareFolderExamplePayload,
  }),
  inputs: unshareFolderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: unshareFolderOutputSchema,
  }),
  examplePayload: {
    data: unshareFolderExamplePayload,
  },
});
