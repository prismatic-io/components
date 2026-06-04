import { action, util } from "@prismatic-io/spectral";
import {
  collection,
  connectionInput,
  orderBy,
  queryOperatorCode,
} from "../inputs";
import { createClient } from "../client";
import { queryDocs } from "../helpers";
import { listDocumentsExamplePayload } from "../examplePayloads";

export const listDocuments = action({
  display: {
    label: "List Documents",
    description: "List all documents in a Cloud Firestore collection",
  },
  perform: async (_context, params) => {
    const client = createClient({
      firebaseConnection: params.firebaseConnection,
    });

    const result = await queryDocs({
      client,
      collection: util.types.toString(params.collection),
      queryOperatorCode: params.queryOperatorCode,
      orderBy: util.types.toString(params.orderBy),
    });

    await client.delete();

    return {
      data: result.map((item) => ({
        id: item.id,
        path: item.ref.path,
        data: item.data(),
      })),
    };
  },
  inputs: {
    collection,
    firebaseConnection: connectionInput,
    orderBy,
    queryOperatorCode,
  },
  examplePayload: listDocumentsExamplePayload,
});

export default listDocuments;
