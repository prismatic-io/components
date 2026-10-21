import { action } from "@prismatic-io/spectral";
import { withFirestore } from "../../client";
import { deleteDocumentExamplePayload } from "../../examplePayloads";
import { deleteDocumentInputs } from "../../inputs";
export const deleteDocument = action({
  display: {
    label: "Delete Document",
    description: "Remove a document from a Cloud Firestore collection",
  },
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const result = await withFirestore(params, (db) =>
      db.collection(params.collection).doc(params.document).delete(),
    );
    return {
      data: result,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteDocumentExamplePayload,
  inputs: deleteDocumentInputs,
  examplePayload: deleteDocumentExamplePayload,
});
