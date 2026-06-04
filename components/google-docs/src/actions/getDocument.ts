import { action, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { connectionInput, documentId, suggestionsViewMode } from "../inputs";
import { getDocumentExamplePayload } from "../examplePayloads";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export const getDocument = action({
  display: {
    label: "Get Document",
    description: "Gets the latest version of the specified document.",
  },
  examplePayload: getDocumentExamplePayload,
  perform: async (
    context,
    { googleConnection, documentId, suggestionsViewMode }
  ) => {
    const googleDocsClient = getClient(googleConnection);
    try {
      const { data } = await googleDocsClient.documents.get({
        documentId,
        suggestionsViewMode,
      });
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    googleConnection: connectionInput,
    documentId,
    suggestionsViewMode,
  },
});
