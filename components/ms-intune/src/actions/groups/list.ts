import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, odataGroupParams, fetchAll } from "../../inputs/general";
import { listGroupsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listGroups = action({
  display: {
    label: "List Groups",
    description: "List all groups.",
  },
  perform: async (
    context,
    {
      connection,
      $filter,
      $select,
      $expand,
      $orderBy,
      $top,
      $count,
      $search,
      fetchAll,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    client.defaults.headers.common.ConsistencyLevel = "eventual";

    const params = {
      $filter,
      $select,
      $expand,
      $orderBy,
      $top,
      $count,
      $search,
    };

    const data = await paginateResults(client, "/groups", fetchAll, params);

    return {
      data,
    };
  },
  inputs: {
    connection,
    fetchAll,
    ...odataGroupParams,
  },
  examplePayload: listGroupsExamplePayload,
});
