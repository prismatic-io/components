import { action } from "@prismatic-io/spectral";
import { createTransientDocumentInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import { createTransientDocumentExamplePayload } from "../../examplePayloads";

export const createTransientDocument = action({
  display: {
    label: "Create Transient Document",
    description: "Uploads a document and obtains the document's ID.",
  },
  inputs: createTransientDocumentInputs,
  perform: async (context, { connection, file, fileName, mimeType }) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);
    const { data } = await client.post(
      "/transientDocuments",
      {
        ["Mime-Type"]: mimeType,
        ["File-Name"]: fileName,
        File: file.data,
      },
      {
        headers: {
          ["Content-Type"]: "multipart/form-data",
        },
      },
    );

    return {
      data,
    };
  },
  examplePayload: createTransientDocumentExamplePayload,
});
