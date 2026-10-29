import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { loadWebDocumentExamplePayload } from "../../examplePayloads";
import { connection, loadingDocumentUrl } from "../../inputs";

export const loadWebDocument = action({
  display: {
    label: "Load Web Document",
    description:
      "Downloads a document from the web using URL and saves it to cloud storage in the specified format.",
  },
  inputs: {
    connection,
    loadingDocumentUrl,
  },
  perform: async (context, { connection, loadingDocumentUrl }) => {
    const client = await getAsposeClient(connection, context.debug.enabled);

    const { data } = await client.put(`/words/loadWebDocument`, {
      LoadingDocumentUrl: loadingDocumentUrl,
    });

    return { data };
  },
  examplePayload: loadWebDocumentExamplePayload,
});
