import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getFolderExamplePayload } from "../../examplePayloads";
import { connectionInput, getFolderId } from "../../inputs";

const folderId = getFolderId(true, "Folder ID");

export const getFolder = action({
  display: {
    label: "Get Folder",
    description: "Retrieve a folder and its lists.",
  },
  examplePayload: getFolderExamplePayload,
  perform: async (context, { connection, folderId }) => {
    const client = createClickUpClient(connection, context.debug.enabled);

    const { data } = await client.get(`/folder/${folderId}`);

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    folderId,
  },
});
