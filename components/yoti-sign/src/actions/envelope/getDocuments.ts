import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { genericMediaResponse } from "../../examplePayloads";
import { connectionInput, envelopeId } from "../../inputs";

export const getDocuments = action({
  display: {
    label: `Get Documents`,
    description: "Get Documents from a specific envelope based on Envelope ID",
  },
  inputs: {
    connection: connectionInput,
    envelopeId,
  },
  perform: async (context, { connection, envelopeId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/envelopes/${envelopeId}/completed-documents`,
      {
        responseType: "arraybuffer",
      },
    );

    return { data };
  },
  examplePayload: {
    data: genericMediaResponse,
  },
});
