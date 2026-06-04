import { action, util } from "@prismatic-io/spectral";
import { collection, documents, connectionInput } from "../inputs";
import { createClient } from "../client";
import { bulkCreateDocumentsExamplePayload } from "../examplePayloads";

export const bulkCreateDocuments = action({
  display: {
    label: "Bulk Create Documents",
    description:
      "Create multiple documents in a Cloud Firestore collection in a single operation",
  },
  perform: async (_context, params) => {
    const client = createClient({
      firebaseConnection: params.firebaseConnection,
    });

    const collectionRef = client
      .firestore()
      .collection(util.types.toString(params.collection));

    
    const batch = client.firestore().batch();

    
    if (typeof params.documents === "string") {
      try {
        params.documents = JSON.parse(params.documents);
      } catch (_e) {
        throw new Error(
          "Invalid format for 'documents'. Must be a valid JSON string.",
        );
      }
    }

    
    if (Array.isArray(params.documents)) {
      
      params.documents.forEach((document) => {
        const docRef = collectionRef.doc(); 
        batch.set(docRef, document);
      });

      
      await batch.commit();
    } else {
      throw new Error(
        `'documents' should be an array, but got ${typeof params.documents}`,
      );
    }

    await client.delete();

    return {
      data: "Documents created successfully.",
    };
  },
  inputs: {
    firebaseConnection: connectionInput,
    collection,
    documents,
  },
  examplePayload: bulkCreateDocumentsExamplePayload,
});

export default bulkCreateDocuments;
