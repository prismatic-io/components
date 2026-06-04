import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, signatureId } from "../inputs";

export const getAccountSignature = action({
  display: {
    label: "Get Account Signature",
    description: "Returns information about the specified stamp.",
  },
  perform: async (context, { connection, signatureId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/signatures/${signatureId}`);
    return { data };
  },
  inputs: {
    connection,
    signatureId,
  },
});
