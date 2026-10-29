import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addOrganizationFollowerInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { addOrganizationFollowerExamplePayload } from "../../examplePayloads";
import { addOrganizationFollowerOutputSchema } from "../../outputSchemas";

export const addOrganizationFollower = action({
  display: {
    label: "Add Organization Follower",
    description: "Adds a follower to an organization.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, userId }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.post(`/organizations/${id}/followers`, {
      user_id: userId,
    });
    return { data };
  },
  inputs: addOrganizationFollowerInputs,
  examplePayload: addOrganizationFollowerExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addOrganizationFollowerOutputSchema,
  }),
});
