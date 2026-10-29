import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { getDocumentExamplePayload } from "../../examplePayloads";
import { connection, fileName, folderPath, storageName } from "../../inputs";

export const getDocument = action({
  display: {
    label: "Get Document",
    description: "Reads common information from the document.",
  },
  inputs: {
    connection,
    documentName: {
      ...fileName,
      label: "Document Name",
      comments: "The filename of the input document.",
    },
    folderPath: {
      ...folderPath,
      comments: "The path to the folder where the document is located.",
      required: false,
    },
    storageName: {
      ...storageName,
      comments: "Storage name.",
    },
  },
  perform: async (
    context,
    { connection, documentName, storageName, folderPath },
  ) => {
    const client = await getAsposeClient(connection, context.debug.enabled);
    const { data } = await client.get(`/words/${documentName}`, {
      params: {
        Storage: storageName || undefined,
        Folder: folderPath || undefined,
      },
    });

    return { data };
  },
  examplePayload: getDocumentExamplePayload,
});
