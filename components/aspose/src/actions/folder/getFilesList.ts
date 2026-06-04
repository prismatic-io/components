import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { getFilesListExamplePayload } from "../../examplePayloads";
import { connection, folderPath, storageName } from "../../inputs";

export const getFilesList = action({
  display: {
    label: "Get Files List",
    description: "Get all files and folders within a folder.",
  },
  inputs: {
    connection,
    folderPath,
    storageName,
  },
  perform: async (context, { connection, folderPath, storageName }) => {
    const client = await getAsposeClient(connection, context.debug.enabled);

    const { data } = await client.get(`/words/storage/folder/${folderPath}`, {
      params: {
        StorageName: storageName || undefined,
      },
    });

    return { data };
  },
  examplePayload: getFilesListExamplePayload,
});
