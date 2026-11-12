import { action, outputSchema } from "@prismatic-io/spectral";
import { updateAccountSignatureImageOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { updateAccountSignatureImageInputs } from "../../inputs";
import { updateAccountSignatureImageExamplePayload } from "../../examplePayloads";

export const updateAccountSignatureImage = action({
  display: {
    label: "Update Account Signature Image",
    description: "Sets a signature image, initials, or stamp.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async () => updateAccountSignatureImageExamplePayload,
  inputs: updateAccountSignatureImageInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateAccountSignatureImageOutputSchema,
  }),
  examplePayload: updateAccountSignatureImageExamplePayload,
});
