import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../../client";
import { deleteAccountSignatureInputs } from "../../inputs";
import { deleteAccountSignatureExamplePayload } from "../../examplePayloads";

export const deleteAccountSignature = action({
  display: {
    label: "Delete Account Signature",
    description: "Deletes a stamp specified by signatureId.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, signatureId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/signatures/${signatureId}`);
    return { data };
  },
  examplePerform: async () => deleteAccountSignatureExamplePayload,
  inputs: deleteAccountSignatureInputs,
  examplePayload: deleteAccountSignatureExamplePayload,
});
