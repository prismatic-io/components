import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, organizationIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getOrganization = action({
  display: {
    label: "Get Organization",
    description: "Gets details of an organization.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get(`/organizations/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: organizationIdInput,
  },
});
