import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import {
  connection,
  destinationPath,
  destinationStorageName,
  sourcePath,
  sourceStorageName,
} from "../../inputs";

export const copyFolder = action({
  display: {
    label: "Copy Folder",
    description: "Copies a folder.",
  },
  inputs: {
    connection,
    sourcePath,
    destinationPath,
    sourceStorageName,
    destinationStorageName,
  },
  perform: async (
    context,
    {
      connection,
      sourcePath,
      destinationPath,
      destinationStorageName,
      sourceStorageName,
    },
  ) => {
    const client = await getAsposeClient(connection, context.debug.enabled);

    await client.put(`/words/storage/folder/copy/${sourcePath}`, null, {
      params: {
        DestPath: destinationPath,
        SrcStorageName: sourceStorageName || undefined,
        DestStorageName: destinationStorageName || undefined,
      },
    });

    return { data: null };
  },
  examplePayload: { data: null },
});
