import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrganizationFollowersInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getOrganizationFollowersExamplePayload } from "../../examplePayloads";
import { getOrganizationFollowersOutputSchema } from "../../outputSchemas";

export const getOrganizationFollowers = action({
  display: {
    label: "Get Organization Followers",
    description: "Lists followers of an organization.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { limit, cursor } = {} },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`/organizations/${id}/followers`, {
      params: { limit, cursor },
    });
    return { data };
  },
  inputs: getOrganizationFollowersInputs,
  examplePayload: getOrganizationFollowersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrganizationFollowersOutputSchema,
  }),
});
