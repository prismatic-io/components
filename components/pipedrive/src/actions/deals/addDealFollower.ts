import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, dealIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const addDealFollower = action({
  display: {
    label: "Add Deal Follower",
    description: "Adds a follower to a deal.",
  },
  perform: async (context, { connection, id, userId }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.post(`/deals/${id}/followers`, {
      user_id: userId,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
    userId: input({
      label: "User ID",
      type: "string",
      required: true,
      clean: util.types.toNumber,
      comments: "The ID of the user",
    }),
  },
});
