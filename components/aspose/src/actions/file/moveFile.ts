import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import {
  connection,
  destinationPath,
  destinationStorageName,
  fileVersionId,
  sourcePath,
  sourceStorageName,
} from "../../inputs";

export const moveFile = action({
  display: {
    label: "Move File",
    description: "Moves a file.",
  },
  inputs: {
    connection,
    sourcePath: {
      ...sourcePath,
      comments:
        "Source file's path. e.g: '/Folder1/fole.ext or '/Bucket/Folder1/file.ext'",
    },
    destinationPath: {
      ...destinationPath,
      comments: "Destination file path.",
    },
    sourceStorageName,
    destinationStorageName,
    fileVersionId,
  },
  perform: async (
    context,
    {
      connection,
      fileVersionId,
      sourcePath,
      destinationPath,
      sourceStorageName,
      destinationStorageName,
    },
  ) => {
    const client = await getAsposeClient(connection, context.debug.enabled);

    await client.put(`/words/storage/file/move/${sourcePath}`, null, {
      params: {
        DestPath: destinationPath,
        SrcStorageName: sourceStorageName || undefined,
        DestStorageName: destinationStorageName || undefined,
        VersionId: fileVersionId || undefined,
      },
    });

    return { data: null };
  },
  examplePayload: { data: null },
});
