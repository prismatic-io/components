import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteOrganizationFollowerInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deleteOrganizationFollowerExamplePayload } from "../../examplePayloads";
import { deleteOrganizationFollowerOutputSchema } from "../../outputSchemas";

export const deleteOrganizationFollower = action({
  display: {
    label: "Delete Organization Follower",
    description: "Deletes a follower from an organization.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, followerId }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(
      `/organizations/${id}/followers/${followerId}`,
    );
    return { data };
  },
  inputs: deleteOrganizationFollowerInputs,
  examplePayload: deleteOrganizationFollowerExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteOrganizationFollowerOutputSchema,
  }),
});
