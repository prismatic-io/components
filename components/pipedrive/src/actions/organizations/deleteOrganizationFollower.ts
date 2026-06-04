import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, organizationIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const deleteOrganizationFollower = action({
  display: {
    label: "Delete Organization Follower",
    description: "Deletes a follower from an organization.",
  },
  perform: async (context, { connection, id, followerId }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.delete(`/organizations/${id}/followers/${followerId}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: organizationIdInput,
    followerId: input({
      label: "Follower ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The ID of the follower",
    }),
  },
});
