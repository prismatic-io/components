import { action, util } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection, fileName, fileData, timeout } from "../inputs";
import { handleErrors } from "../errors";
import { Readable } from "node:stream";
import { uploadFileExamplePayload } from "../examplePayloads";

export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Upload a file to the user's connected drive",
  },
  inputs: {
    connection: oneDriveConnection,
    fileName: {
      ...fileName,
      label: "File Location",
      example: "/folder1/myNewFile.csv",
      comments:
        "Provide a leading slash, followed by the location and name of the new file.",
    },
    fileData,
    timeout,
  },
  perform: async (context, { connection, fileName, fileData, timeout }) => {
    const client = getOneDriveClient(
      connection,
      context.debug.enabled,
      timeout,
    );
    const { data } = util.types.toData(fileData);

    return {
      data: await handleErrors(
        client.put(`/me/drive/root:${fileName}:/content`, Readable.from(data)),
      ),
    };
  },
  examplePayload: uploadFileExamplePayload,
});
