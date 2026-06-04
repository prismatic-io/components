import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, dealIdInput } from "../../inputs";

export const deleteDealParticipant = action({
  display: {
    label: "Delete Deal Participant",
    description: "Deletes a participant from a deal.",
  },
  perform: async (context, { connection, id, dealParticipantId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/deals/${id}/participants/${dealParticipantId}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
    dealParticipantId: input({
      label: "Deal Participant ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The ID of the participant of the deal",
    }),
  },
});
