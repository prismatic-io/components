import { action, util } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection, dir, fileName, path, values } from "../inputs";
import { handleErrors } from "../errors";
import { updateFileExamplePayload } from "../examplePayloads";

export const updateFile = action({
  display: {
    label: "Update File",
    description: "Update the information and metadata of a given file",
  },
  inputs: {
    connection: oneDriveConnection,
    dir: {
      ...dir,
      label: "File Location",
      comments:
        "Provide a leading slash, followed by the location and name of the file.",
      example: "/folder1/myFile.txt",
    },
    fileName: { ...fileName, label: "New File Name", required: false },
    path: { ...path, label: "New File Path", required: false },
    values,
  },
  perform: async (context, { connection, dir, values, fileName, path }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);

    return {
      data: await handleErrors(
        client.patch(`/me/drive/root:${dir}`, {
          
          
          ...util.types.keyValPairListToObject(values),
          name: util.types.toString(fileName),
          parentReference: { path: util.types.toString(path) },
        }),
      ),
    };
  },
  examplePayload: updateFileExamplePayload,
});
