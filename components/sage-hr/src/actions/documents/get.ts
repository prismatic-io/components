import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDocumentExamplePayload } from "../../examplePayloads";
import { connectionInput, document_id } from "../../inputs";

export const getDocument = action({
  display: {
    label: "Get Document",
    description: "View Document Details.",
  },
  inputs: {
    connectionInput,
    document_id,
  },
  perform: async (context, { connectionInput, document_id }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/documents/${document_id}`);
    return {
      data,
    };
  },
  examplePayload: getDocumentExamplePayload,
});
