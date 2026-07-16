import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listGroupsExamplePayload } from "../../examplePayloads/groups";
import { listGroupsInputs } from "../../inputs/groups";
import type { Group } from "../../interfaces/group";
import { paginateRecordsWithLink } from "../../util/util";
export const listGroups = action({
  display: {
    label: "List Groups",
    description: "List groups with optional search and filtering.",
  },
  inputs: listGroupsInputs,
  perform: async (
    context,
    {
      connection,
      extraParameters,
      filters = {},
      sorting = {},
      fetchAll,
      pagination = {},
    },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateRecordsWithLink<Group>(
      client,
      "/groups",
      fetchAll,
      {
        q: filters.q,
        after: pagination.after,
        filter: filters.filter,
        limit: pagination.limit,
        search: filters.search,
        sortBy: sorting.sortBy,
        sortOrder: sorting.sortOrder,
        ...extraParameters,
      },
    );
    return {
      data,
    };
  },
  examplePayload: listGroupsExamplePayload,
});
