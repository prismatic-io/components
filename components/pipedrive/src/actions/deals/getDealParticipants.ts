import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealParticipantsInputs } from "../../inputs";
import { getDealParticipantsExamplePayload } from "../../examplePayloads";
import { getDealParticipantsOutputSchema } from "../../outputSchemas";

export const getDealParticipants = action({
  display: {
    label: "Get Deal Participants",
    description: "Lists participants of a deal.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { start, limit, cursor } = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/deals/${id}/participants`, {
      params: { start, limit, cursor },
    });
    return { data };
  },
  inputs: getDealParticipantsInputs,
  examplePayload: getDealParticipantsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealParticipantsOutputSchema,
  }),
});
