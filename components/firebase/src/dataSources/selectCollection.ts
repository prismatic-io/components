import { dataSource, type Element } from "@prismatic-io/spectral";
import { withFirestore } from "../client";
import { selectCollectionExamplePayload } from "../examplePayloads";
import { selectCollectionInputs } from "../inputs";
export const selectCollection = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Collection",
    description:
      "Select a collection from the Firebase Cloud Firestore database.",
  },
  perform: async (_context, { firebaseConnection }) => {
    const result = await withFirestore({ firebaseConnection }, async (db) => {
      const collections = await db.listCollections();
      return collections.map(
        (item): Element => ({
          key: item.id,
          label: item.path,
        }),
      );
    });
    return {
      result,
    };
  },
  inputs: selectCollectionInputs,
  examplePayload: selectCollectionExamplePayload,
});
