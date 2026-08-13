import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listGroupsExamplePayload } from "../../examplePayloads";
import { listGroupsInputs } from "../../inputs";
import { paginateResults } from "../../util";
export const listGroups = action({
  display: {
    label: "List Groups",
    description: "List all groups.",
  },
  perform: async (context, { connection, $top, fetchAll, filters }) => {
    const client = createClient(connection, context.debug.enabled);
    client.defaults.headers.common.ConsistencyLevel = "eventual";
    const params = {
      $filter: filters.$filter,
      $select: filters.$select,
      $expand: filters.$expand,
      $orderBy: filters.$orderBy,
      $top,
      $count: filters.$count,
      $search: filters.$search,
    };
    const data = await paginateResults(
      client,
      ENDPOINTS.GROUPS,
      fetchAll,
      params,
    );
    return {
      data,
    };
  },
  inputs: listGroupsInputs,
  examplePayload: listGroupsExamplePayload,
});
