import { dataSource, type Element } from "@prismatic-io/spectral";
import { queryDocs } from "../util";
import { withFirestore } from "../client";
import { selectDocumentExamplePayload } from "../examplePayloads";
import { selectDocumentInputs } from "../inputs";
export const selectDocument = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Document",
    description:
      "Select a document from a Firebase Cloud Firestore collection.",
  },
  perform: async (
    _context,
    { collection, firebaseConnection, queryOperatorCode, orderBy },
  ) => {
    const result = await withFirestore({ firebaseConnection }, async (db) => {
      const docs = await queryDocs({
        db,
        collection: collection,
        queryOperatorCode: queryOperatorCode,
        orderBy: orderBy,
      });
      return docs.map(
        (item): Element => ({
          key: item.id,
          label: item.ref.path,
        }),
      );
    });
    return {
      result,
    };
  },
  inputs: selectDocumentInputs,
  examplePayload: selectDocumentExamplePayload,
});
