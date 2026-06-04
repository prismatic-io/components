import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { connection, filePath, fileVersionId, storageName } from "../../inputs";

export const deleteFile = action({
  display: {
    label: "Delete File",
    description: "Deletes a file.",
  },
  inputs: {
    connection,
    filePath,
    fileVersionId,
    storageName: {
      ...storageName,
      comments: "Storage name.",
    },
  },
  perform: async (
    context,
    { connection, filePath, storageName, fileVersionId },
  ) => {
    const client = await getAsposeClient(connection, context.debug.enabled);

    await client.delete(`/words/storage/file/${filePath}`, {
      params: {
        StorageName: storageName || undefined,
        VersionId: fileVersionId || undefined,
      },
    });

    return { data: null };
  },
  examplePayload: { data: null },
});
