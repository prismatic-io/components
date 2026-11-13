import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { deleteFileExamplePayload } from "../../examplePayloads";
import { deleteFileInputs } from "../../inputs";

export const deleteFile = action({
  display: {
    label: "Delete File",
    description: "Deletes a file by drive ID and item ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, driveId, itemId }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(
        client.delete(`/drives/${driveId}/items/${itemId}`),
      ),
    };
  },
  examplePerform: async () => deleteFileExamplePayload,
  inputs: deleteFileInputs,
  examplePayload: deleteFileExamplePayload,
});
