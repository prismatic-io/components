import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createFolderExamplePayload } from "../../examplePayloads";
import { createFolderInputs } from "../../inputs";
import { createFolderOutputSchema } from "../../outputSchemas";

export const createFolder = action({
  display: {
    label: "Create Folder",
    description: "Create a Folder in a Drive.",
  },
  inputs: createFolderInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, siteId, driveId, parentItemId, folderName }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.post(
      `/sites/${siteId}/drives/${driveId}/items/${parentItemId}/children`,
      {
        name: folderName,
        folder: {},
        "@microsoft.graph.conflictBehavior": "rename",
      },
    );
    return { data };
  },
  examplePerform: async (_context, { folderName }) => ({
    data: { ...createFolderExamplePayload.data, name: folderName },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createFolderOutputSchema,
  }),
  examplePayload: createFolderExamplePayload,
});
