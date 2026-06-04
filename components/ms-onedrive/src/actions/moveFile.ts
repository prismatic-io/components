import { action, util } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection, dir, path, fileName } from "../inputs";
import { handleErrors } from "../errors";
import { moveFileExamplePayload } from "../examplePayloads";

export const moveFile = action({
  display: {
    label: "Move File",
    description: "Move the given file to a new location",
  },
  inputs: {
    connection: oneDriveConnection,
    dir: {
      ...dir,
      label: "Current Location",
      comments:
        "Provide a leading slash, followed by the location and name of the file",
      example: "/myFile.txt",
    },
    path: {
      ...path,
      label: "New Location",
      comments:
        "Provide a leading slash, followed by the new location of the file.",
    },
    fileName: { ...fileName, label: "New File Name", example: "myNewFile.txt" },
  },
  perform: async (context, { connection, dir, path, fileName }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);

    return {
      data: await handleErrors(
        client.patch(`/me/drive/root:${dir}`, {
          parentReference: {
            path: `/drive/root:${path}`,
          },
          name: util.types.toString(fileName),
        }),
      ),
    };
  },
  examplePayload: moveFileExamplePayload,
});
