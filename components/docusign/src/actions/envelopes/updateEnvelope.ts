import { action, outputSchema } from "@prismatic-io/spectral";
import { updateEnvelopeOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { updateEnvelopeInputs } from "../../inputs";
import { updateEnvelopeExamplePayload } from "../../examplePayloads";

export const updateEnvelope = action({
  display: {
    label: "Update Envelope",
    description: "Updates an existing envelope.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, jsonInput, envelopeId, advancedUpdate, resendEnvelope },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.put(`/envelopes/${envelopeId}`, jsonInput, {
      params: {
        advanced_update: advancedUpdate,
        resend_envelope: resendEnvelope,
      },
    });
    return { data };
  },
  examplePerform: async () => updateEnvelopeExamplePayload,
  inputs: updateEnvelopeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateEnvelopeOutputSchema,
  }),
  examplePayload: updateEnvelopeExamplePayload,
});
