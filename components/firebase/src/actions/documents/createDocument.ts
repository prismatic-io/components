import { action, outputSchema } from "@prismatic-io/spectral";
import { withFirestore } from "../../client";
import { createDocumentExamplePayload } from "../../examplePayloads";
import { createDocumentInputs } from "../../inputs";
import { createDocumentOutputSchema } from "../../outputSchemas";

export const createDocument = action({
  display: {
    label: "Create Document",
    description: "Create a document in a Cloud Firestore collection",
  },
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const result = await withFirestore(params, (db) =>
      db.collection(params.collection).add(params.data),
    );

    return {
      data: { id: result.id, path: result.path },
    };
  },
  examplePerform: async (
    _context,
    { collection },
  ): Promise<{ data: unknown }> => ({
    data: {
      ...createDocumentExamplePayload.data,
      path: `${collection}/${createDocumentExamplePayload.data.id}`,
    },
  }),
  inputs: createDocumentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createDocumentOutputSchema,
  }),
  examplePayload: createDocumentExamplePayload,
});
