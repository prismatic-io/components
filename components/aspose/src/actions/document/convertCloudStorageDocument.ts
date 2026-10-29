import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import {
  connection,
  documentPassword,
  fileName,
  filePath,
  format,
  loadEncoding,
  storageName,
} from "../../inputs";

export const convertCloudStorageDocument = action({
  display: {
    label: "Convert Cloud Storage Document",
    description:
      "Converts a document in cloud storage to the specified format.",
  },
  inputs: {
    connection,
    fileName: {
      ...fileName,
      comments: "Name of the file inside the storage",
    },
    format,
    documentPassword,
    folderName: {
      ...filePath,
      label: "Folder Name",
      comments: "The name of the folder in the storage.",
      required: false,
    },
    outPath: {
      ...filePath,
      label: "Out Path",
      comments: "The path to the output document.",
      required: false,
    },
    loadEncoding,
    storage: {
      ...storageName,
      label: "Storage",
      comments: "Original document storage.",
    },
  },
  perform: async (
    context,
    {
      documentPassword,
      fileName,
      format,
      outPath,
      storage,
      connection,
      loadEncoding,
      folderName,
    },
  ) => {
    const client = await getAsposeClient(connection, context.debug.enabled);
    const { data } = await client.get(`/words/${fileName}`, {
      params: {
        Format: format,
        Folder: folderName || undefined,
        Storage: storage || undefined,
        Password: documentPassword || undefined,
        LoadEncoding: loadEncoding || undefined,
        OutPath: outPath || undefined,
      },
    });

    return { data };
  },
  examplePayload: { data: {} },
});
