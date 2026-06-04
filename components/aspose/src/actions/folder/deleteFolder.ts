import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { connection, folderPath, recursive, storageName } from "../../inputs";

export const deleteFolder = action({
  display: {
    label: "Delete Folder",
    description: "Deletes a folder.",
  },
  inputs: {
    connection,
    folderPath,
    storageName,
    recursive,
  },
  perform: async (
    context,
    { connection, folderPath, storageName, recursive },
  ) => {
    const client = await getAsposeClient(connection, context.debug.enabled);

    await client.delete(`/words/storage/folder/${folderPath}`, {
      params: {
        StorageName: storageName || undefined,
        Recursive: recursive,
      },
    });

    return { data: null };
  },
  examplePayload: { data: null },
});
