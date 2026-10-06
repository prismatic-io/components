import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteFolderExamplePayload } from "../../examplePayloads";
import { deleteFolderInputs } from "../../inputs";
export const deleteFolder = action({
  display: {
    label: "Delete Folder",
    description: "Delete a folder from a workspace.",
  },
  examplePayload: deleteFolderExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { connection, folderId }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/folder/${folderId}`);
    return {
      data,
    };
  },
  examplePerform: async () => deleteFolderExamplePayload,
  inputs: deleteFolderInputs,
});
