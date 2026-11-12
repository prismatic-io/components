import { action, outputSchema } from "@prismatic-io/spectral";
import { createAccountSignatureOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { createAccountSignatureInputs } from "../../inputs";
import { createAccountSignatureExamplePayload } from "../../examplePayloads";

export const createAccountSignature = action({
  display: {
    label: "Create Account Signature",
    description: "Adds or updates one or more account stamps.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, jsonInput }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.post(`/signatures`, jsonInput);
    return { data };
  },
  examplePerform: async () => createAccountSignatureExamplePayload,
  inputs: createAccountSignatureInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createAccountSignatureOutputSchema,
  }),
  examplePayload: createAccountSignatureExamplePayload,
});
