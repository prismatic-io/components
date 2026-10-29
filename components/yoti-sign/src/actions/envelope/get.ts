import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getEnvelopeResponse } from "../../examplePayloads";
import { connectionInput, envelopeId } from "../../inputs";

export const getEnvelope = action({
  display: {
    label: `Get Envelope`,
    description: "Get Envelope details based on Envelope ID",
  },
  inputs: {
    connection: connectionInput,
    envelopeId,
  },
  perform: async (context, { connection, envelopeId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/envelopes/${envelopeId}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { data };
  },
  examplePayload: {
    data: getEnvelopeResponse,
  },
});
