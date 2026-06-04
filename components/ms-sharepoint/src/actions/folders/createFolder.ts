import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createFolderInputs } from "../../inputs";
import { createFolderExamplePayload } from "../../examplePayloads/folders/createFolderExamplePayload";

export const createFolder = action({
  display: {
    label: "Create a Folder",
    description: "Create a Folder in a Drive",
  },
  inputs: createFolderInputs,
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
  examplePayload: createFolderExamplePayload,
});
