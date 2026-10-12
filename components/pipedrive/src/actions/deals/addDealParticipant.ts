import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addDealParticipantInputs } from "../../inputs";
import { addDealParticipantExamplePayload } from "../../examplePayloads";
import { addDealParticipantOutputSchema } from "../../outputSchemas";
export const addDealParticipant = action({
  display: {
    label: "Add Deal Participant",
    description: "Adds a participant to a deal.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, personId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/deals/${id}/participants`, {
      person_id: personId,
    });
    return { data };
  },
  inputs: addDealParticipantInputs,
  examplePayload: addDealParticipantExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addDealParticipantOutputSchema,
  }),
});
