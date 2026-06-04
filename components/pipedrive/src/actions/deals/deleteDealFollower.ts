import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, dealIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const deleteDealFollower = action({
  display: {
    label: "Delete Deal Follower",
    description: "Deletes a follower from a deal.",
  },
  perform: async (context, { connection, id, followerId }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.delete(`/deals/${id}/followers/${followerId}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
    followerId: input({
      label: "Follower ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The ID of the follower",
    }),
  },
});
