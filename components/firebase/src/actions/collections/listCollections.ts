import { action, outputSchema } from "@prismatic-io/spectral";
import { withFirestore } from "../../client";
import { listCollectionsExamplePayload } from "../../examplePayloads";
import { listCollectionsInputs } from "../../inputs";
import { listCollectionsOutputSchema } from "../../outputSchemas";
export const listCollections = action({
  display: {
    label: "List Collections",
    description: "List all collections in a Cloud Firestore database",
  },
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const data = await withFirestore(params, async (db) => {
      const result = await db.listCollections();
      return result.map((item) => ({ id: item.id, path: item.path }));
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listCollectionsExamplePayload,
  inputs: listCollectionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCollectionsOutputSchema,
  }),
  examplePayload: listCollectionsExamplePayload,
});
