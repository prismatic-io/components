import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateFolderExamplePayload } from "../../examplePayloads";
import { updateFolderInputs } from "../../inputs";
import { updateFolderOutputSchema } from "../../outputSchemas";
export const updateFolder = action({
  display: {
    label: "Update Folder",
    description: "Rename a folder.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateFolderOutputSchema,
  }),
  examplePayload: updateFolderExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { connection, folderId, folderName }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const { data } = await client.put(`/folder/${folderId}`, {
      name: folderName,
    });
    return {
      data,
    };
  },
  examplePerform: async (_context, { folderName }) => ({
    data: {
      ...updateFolderExamplePayload.data,
      name: folderName,
    },
  }),
  inputs: updateFolderInputs,
});
