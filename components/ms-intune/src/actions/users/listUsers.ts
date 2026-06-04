import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, odataParams, fetchAll } from "../../inputs/general";
import { listUsersExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Retrieve a list of user objects.",
  },
  perform: async (
    context,
    {
      connection,
      fetchAll,
      $filter,
      $select,
      $expand,
      $orderBy,
      $top,
      $skip,
      $count,
      $search,
      $format,
      $skipToken,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $filter,
      $select,
      $expand,
      $orderBy,
      $top,
      $skip,
      $count,
      $search,
      $format,
      $skipToken,
    };
    const data = await paginateResults(client, "/users", fetchAll, params);
    return {
      data,
    };
  },
  inputs: {
    connection,
    fetchAll,
    ...odataParams,
  },
  examplePayload: listUsersExamplePayload,
});
