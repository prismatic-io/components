import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import {
  connection,
  destinationPath,
  destinationStorageName,
  sourcePath,
  sourceStorageName,
} from "../../inputs";

export const moveFolder = action({
  display: {
    label: "Move Folder",
    description: "Moves a folder.",
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

    await client.put(`/words/storage/folder/move/${sourcePath}`, null, {
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
