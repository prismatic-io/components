import { Readable } from "node:stream";
import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { uploadFileExamplePayload } from "../../examplePayloads";
import { uploadFileInputs } from "../../inputs";

export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Upload a file to the user's connected drive",
  },
  inputs: uploadFileInputs,
  perform: async (context, { connection, fileName, fileData, timeout }) => {
    const client = getOneDriveClient(
      connection,
      context.debug.enabled,
      timeout,
    );
    const { data } = fileData;

    return {
      data: await handleErrors(
        client.put(`/me/drive/root:${fileName}:/content`, Readable.from(data)),
      ),
    };
  },
  examplePayload: uploadFileExamplePayload,
});
