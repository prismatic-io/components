import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { removeOrganizationUsersExamplePayload } from "../../examplePayloads";
import { removeOrganizationUsersInputs } from "../../inputs";

export const removeOrganizationUsers = action({
  display: {
    label: "Remove Users from Organization",
    description: "Removes users from an organization by accountId.",
  },
  inputs: removeOrganizationUsersInputs,
  perform: async (context, { connection, organizationId, accountIds }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    await client.delete(`/organization/${organizationId}/user`, {
      data: { accountIds },
    });
    return { data: SUCCESS_RESPONSE };
  },
  examplePayload: removeOrganizationUsersExamplePayload,
});
