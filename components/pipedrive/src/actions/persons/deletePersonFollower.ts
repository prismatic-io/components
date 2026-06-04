import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, personIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const deletePersonFollower = action({
  display: {
    label: "Delete Person Follower",
    description: "Deletes a follower from a person.",
  },
  perform: async (context, { connection, id, followerId }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.delete(`/persons/${id}/followers/${followerId}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personIdInput,
    followerId: input({
      label: "Follower ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The ID of the follower",
    }),
  },
});
