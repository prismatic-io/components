import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createVoteExamplePayload } from "../../examplePayloads";
import { createVoteInputs } from "../../inputs";

export const createVote = action({
  display: {
    label: "Create Vote",
    description: "Creates a vote on a post.",
  },
  inputs: createVoteInputs,
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
  examplePayload: createVoteExamplePayload,
});
