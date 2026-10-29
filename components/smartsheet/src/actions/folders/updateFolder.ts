import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateFolderExamplePayload } from "../../examplePayloads";
import { updateFolderInputs } from "../../inputs";

export const updateFolder = action({
  display: {
    label: "Update Folder",
    description: "Updates the name of a folder.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, folderId, folderName },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.put(`/folders/${folderId}`, {
      name: folderName,
    });
    return { data };
  },
  inputs: updateFolderInputs,
  examplePayload: updateFolderExamplePayload,
});
