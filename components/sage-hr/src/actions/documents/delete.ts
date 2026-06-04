import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDocumentExamplePayload } from "../../examplePayloads";
import { connectionInput, document_id } from "../../inputs";

export const deleteDocument = action({
  display: {
    label: "Delete Document",
    description: "Allows admin to delete document.",
  },
  inputs: {
    connectionInput,
    document_id: { ...document_id, comments: "ID of document to be deleted" },
  },
  perform: async (context, { connectionInput, document_id }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(`/documents/${document_id}`);
    return {
      data,
    };
  },
  examplePayload: deleteDocumentExamplePayload,
});
