import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection, dir } from "../inputs";
import { handleErrors } from "../errors";
import { getDriveItemExamplePayload } from "../examplePayloads";

export const getItem = action({
  display: {
    label: "Get Item by Path",
    description:
      "Get the information and metadata of an item with your path in Sharepoint",
  },
  inputs: {
    connection: oneDriveConnection,
    dir: {
      ...dir,
      label: "File Location",
      comments:
        "Provide a leading slash, followed by the location and name of your file.",
      example: "/folder1/myFile.txt",
    },
  },
  perform: async (context, { connection, dir }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(client.get(`/me/drive/root:${dir}`)),
    };
  },
  examplePayload: getDriveItemExamplePayload,
});
