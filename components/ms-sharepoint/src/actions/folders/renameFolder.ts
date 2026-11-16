import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { renameFolderExamplePayload } from "../../examplePayloads";
import { renameFolderInputs } from "../../inputs";
import { renameFolderOutputSchema } from "../../outputSchemas";

export const renameFolder = action({
  display: {
    label: "Rename Folder",
    description: "Rename a Folder in a Drive.",
  },
  inputs: renameFolderInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, siteId, driveId, folderId, folderName }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.patch(`/sites/${siteId}/drives/${driveId}/items/${folderId}`, {
      name: folderName,
    });

    return { data };
  },
  examplePerform: async (_context, { folderName }) => ({
    data: { ...renameFolderExamplePayload.data, name: folderName },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: renameFolderOutputSchema,
  }),
  examplePayload: renameFolderExamplePayload,
});
