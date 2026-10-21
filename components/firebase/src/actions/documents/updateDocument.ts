import { action } from "@prismatic-io/spectral";
import { withFirestore } from "../../client";
import { updateDocumentExamplePayload } from "../../examplePayloads";
import { updateDocumentInputs } from "../../inputs";
export const updateDocument = action({
  display: {
    label: "Update Document",
    description: "Update a document in a Cloud Firestore collection",
  },
  performSafety: "notAllowed",
  perform: async (
    _context,
    { collection, document, data, firebaseConnection },
  ) => {
    const result = await withFirestore({ firebaseConnection }, (db) =>
      db.collection(collection).doc(document).update(data),
    );
    return {
      data: result,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => updateDocumentExamplePayload,
  inputs: updateDocumentInputs,
  examplePayload: updateDocumentExamplePayload,
});
