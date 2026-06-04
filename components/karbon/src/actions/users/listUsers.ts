import { action } from "@prismatic-io/spectral";
import { createKarbonClient } from "../../client";
import listUsersInputs from "../../inputs/users/listUsers";
import { getPaginatedData } from "../../utils";
import { listUsersExamplePayload } from "../../examplePayloads";
import type { User } from "../../interfaces/User";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Get a list of Users",
  },
  inputs: {
    ...listUsersInputs,
  },
  perform: async (
    context,
    { connection, $filter, $top, $skip, getAllData },
  ) => {
    const client = createKarbonClient(connection, context.debug.enabled);

    const data = await getPaginatedData<User>({
      pagination: { $top, $skip },
      client,
      endpoint: "/v3/Users",
      getAllData,
      $filter,
    });
    return { data };
  },
  examplePayload: listUsersExamplePayload,
});
