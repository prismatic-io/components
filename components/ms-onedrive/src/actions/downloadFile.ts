import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection, dir, timeout } from "../inputs";
import { handleErrors } from "../errors";

export const downloadFile = action({
  display: {
    label: "Download File",
    description: "Download a file from the current user's drive",
  },
  inputs: {
    connection: oneDriveConnection,
    fileLocation: {
      ...dir,
      label: "File Location",
      example: "/folder1/myExampleFile.csv",
      comments:
        "Provide a leading slash followed by the location of your file within the current user's drive.",
    },
    timeout,
  },
  perform: async (context, { connection, fileLocation, timeout }) => {
    const client = getOneDriveClient(
      connection,
      context.debug.enabled,
      timeout,
    );

    const fileItem = await handleErrors(
      client.get<{
        "@microsoft.graph.downloadUrl": string;
        file: { mimeType: string };
      }>(`/me/drive/root:${fileLocation}`),
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
