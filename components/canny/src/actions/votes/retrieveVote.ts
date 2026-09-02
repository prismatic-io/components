import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { retrieveVoteExamplePayload } from "../../examplePayloads";
import { retrieveVoteInputs } from "../../inputs";
import { retrieveVoteOutputSchema } from "../../outputSchemas";
export const retrieveVote = action({
  display: {
    label: "Retrieve Vote",
    description: "Retrieves a single vote by ID.",
  },
  inputs: retrieveVoteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: retrieveVoteOutputSchema,
  }),
  perform: async (context, { connection, voteId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/votes/retrieve", { id: voteId });
    return { data };
  },
  examplePayload: retrieveVoteExamplePayload,
});
