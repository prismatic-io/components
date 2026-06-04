import { action, util } from "@prismatic-io/spectral";
import { collection, document, connectionInput } from "../inputs";
import { createClient } from "../client";
import { getDocumentExamplePayload } from "../examplePayloads";

export const getDocument = action({
  display: {
    label: "Get Document",
    description:
      "Get the contents of a document in a Cloud Firestore collection",
  },
  perform: async (_context, params) => {
    const client = createClient({
      firebaseConnection: params.firebaseConnection,
    });
    const result = await client
      .firestore()
      .collection(util.types.toString(params.collection))
      .doc(util.types.toString(params.document))
      .get();

    await client.delete();

    return {
      data: {
        data: result.data(),
        id: result.id,
        createTime: result.createTime?.toDate(),
        updateTime: result.updateTime?.toDate(),
        exists: result.exists,
        readTime: result.readTime?.toDate(),
      },
    };
  },
  inputs: {
    collection,
    document,
    firebaseConnection: connectionInput,
  },
  examplePayload: getDocumentExamplePayload,
});
export default getDocument;
