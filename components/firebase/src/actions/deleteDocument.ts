import { action, util } from "@prismatic-io/spectral";
import { collection, document, connectionInput } from "../inputs";
import { createClient } from "../client";
import { deleteDocumentExamplePayload } from "../examplePayloads";

export const createDocument = action({
  display: {
    label: "Delete Document",
    description: "Remove a document from a Cloud Firestore collection",
  },
  perform: async (_context, params) => {
    const client = createClient({
      firebaseConnection: params.firebaseConnection,
    });
    const result = await client
      .firestore()
      .collection(util.types.toString(params.collection))
      .doc(util.types.toString(params.document))
      .delete();

    await client.delete();

    return {
      data: result,
    };
  },
  inputs: {
    collection,
    document,
    firebaseConnection: connectionInput,
  },
  examplePayload: deleteDocumentExamplePayload,
});

export default createDocument;
