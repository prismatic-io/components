import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listUsersExamplePayload } from "../../examplePayloads/users";
import { listUsersInputs } from "../../inputs/users";
import type { User } from "../../interfaces/user";
import { paginateRecordsWithLink } from "../../util/util";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "List users with optional search and filtering.",
  },
  inputs: listUsersInputs,
  perform: async (
    context,
    { after, connection, extraParameters, filter, limit, search, sortBy, sortOrder, q, fetchAll },
  ) => {
    const client = await createClient(connection, context.debug.enabled);

    const data = await paginateRecordsWithLink<User>(client, "/users", fetchAll, {
      after,
      filter,
      limit,
      search,
      sortBy,
      sortOrder,
      q,
      ...extraParameters,
    });

    return {
      data,
    };
  },
  examplePayload: listUsersExamplePayload,
});
