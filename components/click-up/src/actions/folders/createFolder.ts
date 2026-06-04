import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createFolderExamplePayload } from "../../examplePayloads";
import { connectionInput, folderName, getSpaceId } from "../../inputs";

const spaceId = getSpaceId(true);

export const createFolder = action({
  display: {
    label: "Create Folder",
    description: "Add a new folder to a space.",
  },
  examplePayload: createFolderExamplePayload,
  perform: async (context, { connection, spaceId, folderName }) => {
    const client = createClickUpClient(connection, context.debug.enabled);

    const { data } = await client.post(`/space/${spaceId}/folder`, {
      name: folderName,
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    spaceId,
    folderName,
  },
});
