import { action, outputSchema } from "@prismatic-io/spectral";
import { getEnvelopeOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { getEnvelopeInputs } from "../../inputs";
import { getEnvelopeExamplePayload } from "../../examplePayloads";

export const getEnvelope = action({
  display: {
    label: "Get Envelope",
    description: "Retrieves the overall status for the specified envelope.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { connection, envelopeId, advancedUpdate, include },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/envelopes/${envelopeId}`, {
      params: {
        advanced_update: advancedUpdate,
        include: include || undefined,
      },
    });
    return { data };
  },
  inputs: getEnvelopeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getEnvelopeOutputSchema,
  }),
  examplePayload: getEnvelopeExamplePayload,
});
