import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, envelopeId, advancedUpdate, include } from "../inputs";
import { getEnvelopePayload } from "../examplePayloads";

export const getEnvelope = action({
  display: {
    label: "Get Envelope",
    description: "Retrieves the overall status for the specified envelope.",
  },
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
  inputs: {
    connection,
    envelopeId,
    advancedUpdate,
    include: {
      ...include,
      comments:
        "Specifies additional information about the envelope to return. Enter a comma-separated list, such as tabs,recipients.",
    },
  },
  examplePayload: getEnvelopePayload,
});
