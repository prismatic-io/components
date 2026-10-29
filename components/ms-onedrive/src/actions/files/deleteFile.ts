import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { deleteFileExamplePayload } from "../../examplePayloads";
import { deleteFileInputs } from "../../inputs";

export const deleteFile = action({
  display: {
    label: "Delete File",
    description: "Delete the information and metadata of a file by path",
  },
  perform: async (context, { connection, driveId, itemId }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(
        client.delete(`/drives/${driveId}/items/${itemId}`),
      ),
    };
  },
  inputs: deleteFileInputs,
  examplePayload: deleteFileExamplePayload,
});
