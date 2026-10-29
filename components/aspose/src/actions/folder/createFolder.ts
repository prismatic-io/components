import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { connection, folderPath, storageName } from "../../inputs";

export const createFolder = action({
  display: {
    label: "Create Folder",
    description: "Creates a folder.",
  },
  inputs: {
    connection,
    folderPath,
    storageName,
  },
  perform: async (context, { connection, folderPath, storageName }) => {
    const client = await getAsposeClient(connection, context.debug.enabled);

    await client.put(`/words/storage/folder/${folderPath}`, null, {
      params: {
        StorageName: storageName || undefined,
      },
    });

    return { data: null };
  },
  examplePayload: { data: null },
});
