import { action } from "@prismatic-io/spectral";
import { withFirestore } from "../../client";
import { getDocumentExamplePayload } from "../../examplePayloads";
import { getDocumentInputs } from "../../inputs";

export const getDocument = action({
  display: {
    label: "Get Document",
    description:
      "Get the contents of a document in a Cloud Firestore collection",
  },
  performSafety: "safe",
  perform: async (_context, params) => {
    const data = await withFirestore(params, async (db) => {
      const result = await db
        .collection(params.collection)
        .doc(params.document)
        .get();

      return {
        data: result.data(),
        id: result.id,
        createTime: result.createTime?.toDate(),
        updateTime: result.updateTime?.toDate(),
        exists: result.exists,
        readTime: result.readTime?.toDate(),
      };
    });

    return {
      data,
    };
  },
  inputs: getDocumentInputs,
  examplePayload: getDocumentExamplePayload,
});
