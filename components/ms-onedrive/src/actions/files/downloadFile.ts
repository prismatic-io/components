import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { downloadFileInputs } from "../../inputs";
import type { DriveItemDownload } from "../../types";

export const downloadFile = action({
  display: {
    label: "Download File",
    description: "Download a file from the current user's drive",
  },
  inputs: downloadFileInputs,
  perform: async (context, { connection, fileLocation, timeout }) => {
    const client = getOneDriveClient(
      connection,
      context.debug.enabled,
      timeout,
    );

    const fileItem = await handleErrors(
      client.get<DriveItemDownload>(`/me/drive/root:${fileLocation}`),
    );

    const {
      "@microsoft.graph.downloadUrl": downloadUrl,
      file: { mimeType: contentType },
    } = fileItem;

    const data = await handleErrors(
      client.get<Buffer>(downloadUrl, { responseType: "arraybuffer" }),
    );

    return {
      data,
      contentType,
    };
  },
});
