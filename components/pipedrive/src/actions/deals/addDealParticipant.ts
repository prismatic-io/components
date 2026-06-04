import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, dealIdInput } from "../../inputs";

export const addDealParticipant = action({
  display: {
    label: "Add Deal Participant",
    description: "Adds a participant to a deal.",
  },
  perform: async (context, { connection, id, personId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/deals/${id}/participants`, {
      person_id: personId,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
    personId: input({
      label: "Person ID",
      type: "string",
      required: true,
      clean: util.types.toNumber,
      comments: "The ID of the person",
    }),
  },
});
