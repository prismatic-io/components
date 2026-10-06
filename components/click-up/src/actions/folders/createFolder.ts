import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createFolderExamplePayload } from "../../examplePayloads";
import { createFolderInputs } from "../../inputs";
import { createFolderOutputSchema } from "../../outputSchemas";
export const createFolder = action({
  display: {
    label: "Create Folder",
    description: "Add a new folder to a space.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createFolderOutputSchema,
  }),
  examplePayload: createFolderExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { connection, spaceId, folderName }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const { data } = await client.post(`/space/${spaceId}/folder`, {
      name: folderName,
    });
    return {
      data,
    };
  },
  examplePerform: async (_context, { folderName }) => ({
    data: {
      ...createFolderExamplePayload.data,
      name: folderName,
    },
  }),
  inputs: createFolderInputs,
});
