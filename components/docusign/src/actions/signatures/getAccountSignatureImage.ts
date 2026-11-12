import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../../client";
import { getAccountSignatureImageInputs } from "../../inputs";

export const getAccountSignatureImage = action({
  display: {
    label: "Get Account Signature Image",
    description: "Returns the image for an account stamp.",
  },
  performSafety: "safe",
  perform: async (context, { connection, signatureId, imageType }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/signatures/${signatureId}/${imageType}`,
    );
    return { data };
  },
  inputs: getAccountSignatureImageInputs,
});
