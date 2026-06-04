import { action, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import {
  connectionInput,
  documentId,
  requests,
  requiredRevisionId,
  targetRevisionId,
} from "../inputs";
import { batchUpdateDocumentsExamplePayload } from "../examplePayloads";
import { docs_v1 } from "@googleapis/docs";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export const batchUpdateDocuments = action({
  display: {
    label: "Batch Update Documents",
    description: "Applies one or more updates to the document.",
  },
  examplePayload: batchUpdateDocumentsExamplePayload,
  perform: async (
    context,
    {
      googleConnection,
      documentId,
      requests,
      requiredRevisionId,
      targetRevisionId,
    }
  ) => {
    const googleDocsClient = getClient(googleConnection);

    if (requests && !util.types.isJSON(requests)) {
      throw new Error("Requests input must be a valid JSON.");
    }

    const writeControl: docs_v1.Schema$WriteControl = {
      requiredRevisionId: requiredRevisionId || null,
      targetRevisionId: targetRevisionId || null,
    };

    try {
      const { data } = await googleDocsClient.documents.batchUpdate({
        documentId,
        requestBody: {
          requests: requests
            ? (JSON.parse(requests) as docs_v1.Schema$Request[])
            : undefined,
          writeControl,
        },
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
    documentId: {
      ...documentId,
      comments: "The ID of the document to update.",
    },
    requests,
    requiredRevisionId,
    targetRevisionId,
  },
});
