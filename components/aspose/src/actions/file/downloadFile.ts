import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { downloadFileExamplePayload } from "../../examplePayloads";
import { connection, filePath, fileVersionId, storageName } from "../../inputs";

export const downloadFile = action({
  display: {
    label: "Download File",
    description: "Downloads a file.",
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

    const { data } = await client.get(`/words/storage/file/${filePath}`, {
      params: {
        StorageName: storageName || undefined,
        VersionId: fileVersionId || undefined,
      },
    });

    return { data };
  },
  examplePayload: downloadFileExamplePayload,
});
