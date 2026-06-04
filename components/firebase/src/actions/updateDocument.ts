import { action, util } from "@prismatic-io/spectral";
import { collection, document, data, connectionInput } from "../inputs";
import { createClient } from "../client";
import { updateDocumentExamplePayload } from "../examplePayloads";

export const updateDocument = action({
  display: {
    label: "Update Document",
    description: "Updates a document in a Cloud Firestore collection",
  },
  perform: async (
    _context,
    { collection, document, data, firebaseConnection },
  ) => {
    const client = createClient({
      firebaseConnection: firebaseConnection,
    });
    const result = await client
      .firestore()
      .collection(util.types.toString(collection))
      .doc(util.types.toString(document))
      .update(util.types.keyValPairListToObject(data));

    await client.delete();

    return {
      data: result,
    };
  },
  inputs: {
    collection,
    document,
    data,
    firebaseConnection: connectionInput,
  },
  examplePayload: updateDocumentExamplePayload,
});

export default updateDocument;
