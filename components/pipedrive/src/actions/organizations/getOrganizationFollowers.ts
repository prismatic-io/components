import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, organizationIdInput, paginationLimitInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getOrganizationFollowers = action({
  display: {
    label: "Get Organization Followers",
    description: "Lists followers of an organization.",
  },
  perform: async (context, { connection, id, limit, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get(`/organizations/${id}/followers`, {
      params: { limit, cursor },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: organizationIdInput,
    limit: paginationLimitInput,
    cursor,
  },
});
