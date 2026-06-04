import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, organizationIdInput, paginationLimitInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getOrganizationPersons = action({
  display: {
    label: "Get Organization Persons",
    description: "Lists persons of an organization.",
  },
  perform: async (context, { connection, id, limit, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/persons", {
      params: { limit, org_id: id, cursor },
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
