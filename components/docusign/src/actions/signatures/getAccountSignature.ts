import { action, outputSchema } from "@prismatic-io/spectral";
import { getAccountSignatureOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { getAccountSignatureInputs } from "../../inputs";
import { getAccountSignatureExamplePayload } from "../../examplePayloads";

export const getAccountSignature = action({
  display: {
    label: "Get Account Signature",
    description: "Returns information about the specified stamp.",
  },
  performSafety: "safe",
  perform: async (context, { connection, signatureId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/signatures/${signatureId}`);
    return { data };
  },
  inputs: getAccountSignatureInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAccountSignatureOutputSchema,
  }),
  examplePayload: getAccountSignatureExamplePayload,
});
