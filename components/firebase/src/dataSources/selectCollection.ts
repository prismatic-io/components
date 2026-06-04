import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectCollectionInputs } from "../inputs";

export const selectCollection = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Collection",
    description:
      "Select a collection from your Firebase Cloud Firestore database",
  },
  perform: async (_context, { firebaseConnection }) => {
    const client = createClient({
      firebaseConnection: firebaseConnection,
    });

    const collections = await client.firestore().listCollections();

    return {
      result: collections.map(
        (item): Element => ({
          key: item.id,
          label: item.path,
        }),
      ),
    };
  },
  inputs: selectCollectionInputs,
});
