import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listUsersExamplePayload } from "../../examplePayloads";
import { listUsersInputs } from "../../inputs";
export const listUsers = action({
  display: {
    label: "List Users",
    description: "Lists all users in the organization.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, email, includeAll, modifiedSince, pagination },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/users`, {
      params: {
        email,
        include: "lastLogin",
        includeAll,
        modifiedSince,
        page: pagination.page,
        pageSize: pagination.pageSize,
      },
    });
    return { data };
  },
  inputs: listUsersInputs,
  examplePayload: listUsersExamplePayload,
});
