import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getEnvelopeStatusResponse } from "../../examplePayloads";
import { connectionInput, envelopeId } from "../../inputs";

export const getEnvelopeStatus = action({
  display: {
    label: `Envelope Status`,
    description: "Get the status of a single envelope",
  },
  inputs: {
    connection: connectionInput,
    envelopeId,
  },
  perform: async (context, { connection, envelopeId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/envelopes/${envelopeId}/status`);

    return { data };
  },
  examplePayload: {
    data: getEnvelopeStatusResponse,
  },
});
