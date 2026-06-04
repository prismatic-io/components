import { action, util } from "@prismatic-io/spectral";
import { collection, data, connectionInput } from "../inputs";
import { createClient } from "../client";
import { createDocumentExamplePayload } from "../examplePayloads";

export const createDocument = action({
  display: {
    label: "Create Document",
    description: "Create a document in a Cloud Firestore collection",
  },
  perform: async (_context, params) => {
    const client = createClient({
      firebaseConnection: params.firebaseConnection,
    });
    const result = await client
      .firestore()
      .collection(util.types.toString(params.collection))
      .add(util.types.keyValPairListToObject(params.data));
    await client.delete();

    return {
      data: { id: result.id, path: result.path },
    };
  },
  inputs: { collection, data, firebaseConnection: connectionInput },
  examplePayload: createDocumentExamplePayload,
});

export default createDocument;
