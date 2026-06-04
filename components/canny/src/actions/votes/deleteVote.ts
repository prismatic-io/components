import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteVoteExamplePayload } from "../../examplePayloads";
import { deleteVoteInputs } from "../../inputs";

export const deleteVote = action({
  display: {
    label: "Delete Vote",
    description: "Deletes a vote.",
  },
  inputs: deleteVoteInputs,
  perform: async (context, { connection, voteId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/votes/delete", { voteID: voteId });
    return { data };
  },
  examplePayload: deleteVoteExamplePayload,
});
