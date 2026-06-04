import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listOrganizationUsersExamplePayload } from "../../examplePayloads";
import { listOrganizationUsersInputs } from "../../inputs";
import type { User } from "../../types";
import { getPaginatedData } from "../../util";

export const listOrganizationUsers = action({
  display: {
    label: "List Organization Users",
    description: "Returns users associated with an organization.",
  },
  inputs: listOrganizationUsersInputs,
  perform: async (
    context,
    { connection, organizationId, start, limit, fetchAll },
  ) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await getPaginatedData<User>(
      client,
      `/organization/${organizationId}/user`,
      fetchAll,
      { params: { start, limit } },
    );
    return { data };
  },
  examplePayload: listOrganizationUsersExamplePayload,
});
