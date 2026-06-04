import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { splitDocumentExamplePayload } from "../../examplePayloads";
import {
  connection,
  destinationFileName,
  diagramName,
  documentPassword,
  folderPath,
  format,
  fromPage,
  loadEncoding,
  storageName,
  toPage,
  zipOutput,
} from "../../inputs";

export const splitDocument = action({
  display: {
    label: "Split Document",
    description:
      "Splits a document into parts and saves them in the specified format.",
  },
  inputs: {
    documentName: {
      ...diagramName,
      label: "Document Name",
      comments: "The filename of the input document.",
    },
    documentPassword,
    storageName,
    loadEncoding,
    connection,
    fromPage,
    toPage,
    zipOutput,
    format: {
      ...format,
      comments: "The format to split.",
    },
    destinationFileName: {
      ...destinationFileName,
      required: false,
      comments:
        "Result path of the document after the operation. If this parameter " +
        "is ommited then result of the operation will be saved as the source document.",
    },
    folder: {
      ...folderPath,
      example: "folder1",
      label: "Folder",
      comments: "Original document folder",
      required: false,
    },
  },
  perform: async (
    context,
    {
      documentPassword,
      toPage,
      zipOutput,
      destinationFileName,
      documentName,
      fromPage,
      storageName,
      loadEncoding,
      connection,
      folder,
      format,
    },
  ) => {
    const client = await getAsposeClient(connection, context.debug.enabled);
    const params = {
      Format: format,
      Folder: folder || undefined,
      Storage: storageName || undefined,
      LoadEncoding: loadEncoding || undefined,
      Password: documentPassword || undefined,
      From: fromPage || undefined,
      To: toPage || undefined,
      ZipOutput: zipOutput || undefined,
      DestFileName: destinationFileName || undefined,
    };

    const { data } = await client.put(`/words/${documentName}/split`, null, {
      params,
    });

    return { data };
  },
  examplePayload: splitDocumentExamplePayload,
});
