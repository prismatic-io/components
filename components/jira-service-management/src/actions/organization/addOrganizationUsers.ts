import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { addOrganizationUsersExamplePayload } from "../../examplePayloads";
import { addOrganizationUsersInputs } from "../../inputs";

export const addOrganizationUsers = action({
  display: {
    label: "Add Users to Organization",
    description: "Adds users to an organization by accountId.",
  },
  inputs: addOrganizationUsersInputs,
  perform: async (context, { connection, organizationId, accountIds }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    await client.post(`/organization/${organizationId}/user`, { accountIds });
    return { data: SUCCESS_RESPONSE };
  },
  examplePayload: addOrganizationUsersExamplePayload,
});
