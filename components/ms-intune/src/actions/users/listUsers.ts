import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listUsersExamplePayload } from "../../examplePayloads";
import { listUsersInputs } from "../../inputs";
import { paginateResults } from "../../util";
export const listUsers = action({
  display: {
    label: "List Users",
    description: "Retrieve a list of user objects.",
  },
  perform: async (context, { connection, fetchAll, pagination, filters }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $filter: filters.$filter,
      $select: filters.$select,
      $expand: filters.$expand,
      $orderBy: filters.$orderBy,
      $top: pagination.$top,
      $skip: pagination.$skip,
      $count: filters.$count,
      $search: filters.$search,
      $format: filters.$format,
      $skipToken: pagination.$skipToken,
    };
    const data = await paginateResults(
      client,
      ENDPOINTS.USERS,
      fetchAll,
      params,
    );
    return {
      data,
    };
  },
  inputs: listUsersInputs,
  examplePayload: listUsersExamplePayload,
});
