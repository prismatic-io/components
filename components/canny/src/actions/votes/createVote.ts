import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createVoteExamplePayload } from "../../examplePayloads";
import { createVoteInputs } from "../../inputs";
import { createVoteOutputSchema } from "../../outputSchemas";
export const createVote = action({
  display: {
    label: "Create Vote",
    description: "Creates a vote on a post.",
  },
  inputs: createVoteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createVoteOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, postId, voterId, additionalFields },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/votes/create", {
      postID: postId,
      voterID: voterId,
      ...additionalFields,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createVoteExamplePayload,
  examplePayload: createVoteExamplePayload,
});
