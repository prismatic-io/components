import { action, util } from "@prismatic-io/spectral";
import {
  collection,
  document,
  fieldToRemove,
  connectionInput,
} from "../inputs";
import { createClient } from "../client";
import { firestore } from "firebase-admin";
import { removeFieldExamplePayload } from "../examplePayloads";

export const removeField = action({
  display: {
    label: "Remove Field",
    description:
      "Completely removes a field from a given document (may not work on a field with a null value)",
  },
  perform: async (_context, params) => {
    const client = createClient({
      firebaseConnection: params.firebaseConnection,
    });
    const result = await client
      .firestore()
      .collection(util.types.toString(params.collection))
      .doc(util.types.toString(params.document))
      .update({
        [util.types.toString(params.fieldToRemove)]:
          firestore.FieldValue.delete(),
      });

    await client.delete();

    return {
      data: result,
    };
  },
  inputs: {
    collection,
    document,
    fieldToRemove,
    firebaseConnection: connectionInput,
  },
  examplePayload: removeFieldExamplePayload,
});

export default removeField;
