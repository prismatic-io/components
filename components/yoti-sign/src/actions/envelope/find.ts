import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { findEnvelopesResponse } from "../../examplePayloads";
import { connectionInput, envelopeIds } from "../../inputs";

export const findEnvelopes = action({
  display: {
    label: `Find Envelopes`,
    description:
      "This allows you to find the envelope details for specified envelopes.",
  },
  inputs: {
    connection: connectionInput,
    envelopeIds,
  },
  perform: async (context, { connection, envelopeIds }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/organisations/envelopes/find`, {
      envelope_ids: envelopeIds,
    });

    return { data };
  },
  examplePayload: {
    data: findEnvelopesResponse,
  },
});
