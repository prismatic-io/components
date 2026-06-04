import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, organizationIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const addOrganizationFollower = action({
  display: {
    label: "Add Organization Follower",
    description: "Adds a follower to an organization.",
  },
  perform: async (context, { connection, id, userId }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.post(`/organizations/${id}/followers`, {
      user_id: userId,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: organizationIdInput,
    userId: input({
      label: "User ID",
      type: "string",
      required: true,
      clean: util.types.toNumber,
      comments: "The ID of the user",
    }),
  },
});
