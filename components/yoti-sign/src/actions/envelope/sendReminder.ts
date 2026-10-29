import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { sendReminderResponse } from "../../examplePayloads";
import { connectionInput, envelopeId, recipientId } from "../../inputs";

export const sendEnvelopeReminder = action({
  display: {
    label: `Send Reminder`,
    description: "Send a reminder to a recipient to sign the envelope.",
  },
  inputs: {
    connection: connectionInput,
    envelopeId,
    recipientId,
  },
  perform: async (context, { connection, envelopeId, recipientId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/envelopes/${envelopeId}/recipients/${recipientId}/send-reminder`,
    );

    return { data };
  },
  examplePayload: {
    data: sendReminderResponse,
  },
});
