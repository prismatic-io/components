import { action, outputSchema } from "@prismatic-io/spectral";
import { withFirestore } from "../../client";
import { listDocumentsExamplePayload } from "../../examplePayloads";
import { listDocumentsInputs } from "../../inputs";
import { listDocumentsOutputSchema } from "../../outputSchemas";
import { queryDocs } from "../../util";
export const listDocuments = action({
  display: {
    label: "List Documents",
    description: "List all documents in a Cloud Firestore collection",
  },
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const data = await withFirestore(params, async (db) => {
      const result = await queryDocs({
        db,
        collection: params.collection,
        queryOperatorCode: params.queryOperatorCode,
        orderBy: params.orderBy,
      });
      return result.map((item) => ({
        id: item.id,
        path: item.ref.path,
        data: item.data(),
      }));
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listDocumentsExamplePayload,
  inputs: listDocumentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDocumentsOutputSchema,
  }),
  examplePayload: listDocumentsExamplePayload,
});
