import { action } from "@prismatic-io/spectral";
import { FieldValue } from "firebase-admin/firestore";
import { withFirestore } from "../../client";
import { removeFieldExamplePayload } from "../../examplePayloads";
import { removeFieldInputs } from "../../inputs";
export const removeField = action({
  display: {
    label: "Remove Field",
    description:
      "Completely removes a field from a given document (may not work on a field with a null value)",
  },
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const result = await withFirestore(params, (db) =>
      db
        .collection(params.collection)
        .doc(params.document)
        .update({
          [params.fieldToRemove]: FieldValue.delete(),
        }),
    );
    return {
      data: result,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => removeFieldExamplePayload,
  inputs: removeFieldInputs,
  examplePayload: removeFieldExamplePayload,
});
