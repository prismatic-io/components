import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { moveFolderExamplePayload } from "../../examplePayloads";
import { moveFolderInputs } from "../../inputs";

export const moveFolder = action({
  display: {
    label: "Move Folder",
    description: "Moves a folder to a specified destination.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, folderId, destinationId },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.post(`/folders/${folderId}/move`, {
      destinationId,
      destinationType: "folder",
    });
    return { data };
  },
  inputs: moveFolderInputs,
  examplePayload: moveFolderExamplePayload,
});
