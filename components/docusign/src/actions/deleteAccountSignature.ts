import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, accountId, signatureId } from "../inputs";

export const deleteAccountSignature = action({
  display: {
    label: "Delete Account Signature",
    description: "Deletes a stamp specified by signatureId.",
  },
  perform: async (context, { connection, signatureId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/signatures/${signatureId}`);
    return { data };
  },
  inputs: {
    connection,
    accountId,
    signatureId,
  },
});
