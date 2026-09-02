import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteVoteExamplePayload } from "../../examplePayloads";
import { deleteVoteInputs } from "../../inputs";
import { deleteVoteOutputSchema } from "../../outputSchemas";
export const deleteVote = action({
  display: {
    label: "Delete Vote",
    description: "Deletes a vote.",
  },
  inputs: deleteVoteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteVoteOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, voteId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/votes/delete", { voteID: voteId });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteVoteExamplePayload,
  examplePayload: deleteVoteExamplePayload,
});
