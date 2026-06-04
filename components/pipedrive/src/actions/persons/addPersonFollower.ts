import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, personIdInput, userId } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const addPersonFollower = action({
  display: {
    label: "Add Person Follower",
    description: "Adds a follower to a person.",
  },
  perform: async (context, { connection, id, userId }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const data = await client.post(`/persons/${id}/followers`, {
      user_id: userId,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personIdInput,
    userId: {
      ...userId,
      required: true,
    },
  },
});
