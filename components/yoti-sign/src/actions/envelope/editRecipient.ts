import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  envelopeId,
  recipientId,
  recipientInfo,
} from "../../inputs";

export const editRecipient = action({
  display: {
    label: `Edit Recipient`,
    description: "Change the recipient of your envelope.",
  },
  inputs: {
    connection: connectionInput,
    envelopeId,
    recipientId,
    recipientInfo,
  },
  perform: async (
    context,
    { connection, envelopeId, recipientInfo, recipientId },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(
      `/envelopes/${envelopeId}/recipients/${recipientId}`,
      recipientInfo,
    );

    return { data };
  },
  examplePayload: {
    data: {},
  },
});
