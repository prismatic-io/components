import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDealParticipantInputs } from "../../inputs";
import { deleteDealParticipantExamplePayload } from "../../examplePayloads";
import { deleteDealParticipantOutputSchema } from "../../outputSchemas";

export const deleteDealParticipant = action({
  display: {
    label: "Delete Deal Participant",
    description: "Deletes a participant from a deal.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, dealParticipantId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `/deals/${id}/participants/${dealParticipantId}`,
    );
    return { data };
  },
  inputs: deleteDealParticipantInputs,
  examplePayload: deleteDealParticipantExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteDealParticipantOutputSchema,
  }),
});
