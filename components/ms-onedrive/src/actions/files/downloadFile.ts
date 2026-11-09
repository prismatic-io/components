import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { downloadFileExamplePayload } from "../../examplePayloads";
import { downloadFileInputs } from "../../inputs";

export const downloadFile = action({
  display: {
    label: "Download File",
    description: "Downloads a file from the current user's drive.",
  },
  inputs: downloadFileInputs,
  perform: async (context, { connection, fileLocation, timeout }) => {
    const client = getOneDriveClient(
      connection,
      context.debug.enabled,
      timeout,
    );

    const metadata = await handleErrors(
      client.get<{ file: { mimeType: string } }>(
        `/me/drive/root:${fileLocation}`,
      ),
    );

    const data = Buffer.from(
      await handleErrors(
        client.get(`/me/drive/root:${fileLocation}:/content`, {
          responseType: "arraybuffer",
        }),
      ),
    );

    return {
      data,
      contentType: metadata.file.mimeType,
    };
  },
  examplePayload: downloadFileExamplePayload,
});
