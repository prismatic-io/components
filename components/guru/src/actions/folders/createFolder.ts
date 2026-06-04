import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { createFolderInputs } from "../../inputs";
import { createFolderPayload } from "../../examplePayloads";

export const createFolder = action({
  display: {
    label: "Create Folder",
    description: "Create a new folder in a collection",
  },
  perform: async (
    context,
    { connection, folderTitle, collectionId, folderDescription, parentFolder },
  ) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const requestBody = {
      title: folderTitle,
      collection: {
        id: collectionId,
      },
      description: folderDescription,
      parentFolder: parentFolder
        ? {
            id: parentFolder,
          }
        : undefined,
    };

    const { data } = await client.post("/folders", requestBody);

    return { data };
  },
  inputs: createFolderInputs,
  examplePayload: createFolderPayload,
});
