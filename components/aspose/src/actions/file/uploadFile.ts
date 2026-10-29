import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { connection, fileContent, filePath, storageName } from "../../inputs";

export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Uploads a file.",
  },
  inputs: {
    connection,
    filePath,
    fileContent,
    storageName: {
      ...storageName,
      comments: "Storage name.",
    },
  },
  perform: async (
    context,
    { connection, filePath, fileContent, storageName },
  ) => {
    const client = await getAsposeClient(connection, context.debug.enabled);

    await client.put(`/words/storage/file/${filePath}`, fileContent, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        storageName: storageName || undefined,
      },
    });

    return { data: null };
  },
  examplePayload: { data: null },
});
