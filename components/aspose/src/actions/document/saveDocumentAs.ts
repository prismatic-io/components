import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { saveDocumentAsExamplePayload } from "../../examplePayloads";
import {
  connection,
  destinationFileName,
  documentPassword,
  fileName,
  filePath,
  format,
  loadEncoding,
  saveOptions,
  storageName,
} from "../../inputs";

export const saveDocumentAs = action({
  display: {
    label: "Save Document As",
    description:
      "Converts a document in cloud storage to the specified format.",
  },
  inputs: {
    connection,
    fileName: {
      ...fileName,
      comments: "Name of the file to convert inside your Aspose Storage.",
    },
    destinationFileName,
    format,
    saveOptions,
    folderName: {
      ...filePath,
      label: "Folder Name",
      comments: "The name of the folder in the storage.",
      required: false,
    },
    documentPassword,
    loadEncoding,
    storage: {
      ...storageName,
      label: "Storage",
      comments: "Original document storage name.",
    },
  },
  perform: async (
    context,
    {
      documentPassword,
      fileName,
      destinationFileName,
      format,
      storage,
      connection,
      loadEncoding,
      folderName,
      saveOptions,
    },
  ) => {
    const client = await getAsposeClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/words/${fileName}/saveAs`,
      {
        SaveFormat: format,
        FileName: destinationFileName,
        ...saveOptions,
      },
      {
        params: {
          Folder: folderName || undefined,
          Storage: storage || undefined,
          Password: documentPassword || undefined,
          LoadEncoding: loadEncoding || undefined,
        },
      },
    );

    return { data };
  },
  examplePayload: saveDocumentAsExamplePayload,
});
