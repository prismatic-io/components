import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteFolderExamplePayload } from "../../examplePayloads";
import { deleteFolderInputs } from "../../inputs";

export const deleteFolder = action({
  display: {
    label: "Delete Folder",
    description: "Deletes a folder by its ID.",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, folderId }) => {
    const client = createClient(connection, debug);
    const { data } = await client.delete(`/folders/${folderId}`);
    return { data };
  },
  inputs: deleteFolderInputs,
  examplePayload: deleteFolderExamplePayload,
});
