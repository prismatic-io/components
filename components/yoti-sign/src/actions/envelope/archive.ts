import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, envelopeId } from "../../inputs";

export const archiveEnvelope = action({
  display: {
    label: `Archive Envelope`,
    description:
      "Archiving an envelope stops all other signers from signing and leaves the envelope in the state it was archived in.",
  },
  inputs: {
    connection: connectionInput,
    envelopeId,
  },
  perform: async (context, { connection, envelopeId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(`/envelopes/${envelopeId}`);

    return { data };
  },
  examplePayload: {
    data: {},
  },
});
