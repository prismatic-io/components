import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { convertLocalDocumentExamplePayload } from "../../examplePayloads";
import {
  connection,
  documentPassword,
  fileContent,
  fileNameFieldValue,
  filePath,
  format,
  loadEncoding,
  storageName,
} from "../../inputs";

export const convertLocalDocument = action({
  display: {
    label: "Convert Local Document",
    description:
      "Converts a document on a local drive to the specified format.",
  },
  inputs: {
    connection,
    outPath: {
      ...filePath,
      label: "Out Path",
      comments: "The path to the output document on a local storage.",
      required: false,
    },
    documentPassword,
    format,
    fileNameFieldValue,
    loadEncoding,
    storage: {
      ...storageName,
      label: "Storage",
      comments: "Original document storage name.",
    },
    document: {
      ...fileContent,
      label: "Document",
      comments: "The document to convert.",
    },
  },
  perform: async (
    context,
    {
      document,
      documentPassword,
      format,
      fileNameFieldValue,
      outPath,
      storage,
      connection,
      loadEncoding,
    },
  ) => {
    const client = await getAsposeClient(connection, context.debug.enabled);
    const { data } = await client.put("/words/convert", document.data, {
      params: {
        Format: format,
        Storage: storage || undefined,
        Password: documentPassword || undefined,
        LoadEncoding: loadEncoding || undefined,
        FileNameFieldValue: fileNameFieldValue || undefined,
        OutPath: outPath || undefined,
      },
    });

    return { data };
  },
  examplePayload: convertLocalDocumentExamplePayload,
});
