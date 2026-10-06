import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getFolderExamplePayload } from "../../examplePayloads";
import { getFolderInputs } from "../../inputs";
import { getFolderOutputSchema } from "../../outputSchemas";
export const getFolder = action({
  display: {
    label: "Get Folder",
    description: "Retrieve a folder and its lists.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFolderOutputSchema,
  }),
  examplePayload: getFolderExamplePayload,
  performSafety: "safe",
  perform: async (context, { connection, folderId }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const { data } = await client.get(`/folder/${folderId}`);
    return {
      data,
    };
  },
  inputs: getFolderInputs,
});
