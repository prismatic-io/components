import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, signatureId, imageType } from "../inputs";

export const updateAccountSignatureImage = action({
  display: {
    label: "Update Account Signature Image",
    description: "Sets a signature image, initials, or stamp.",
  },
  perform: async (context, { connection, signatureId, imageType }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );

    const { data } = await client.put(
      `/signatures/${signatureId}/${imageType}`,
    );
    return { data };
  },
  inputs: {
    connection,
    signatureId: { ...signatureId, comments: "The ID of the account stamp." },
    imageType,
  },
});
