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
    { after, connection, extraParameters, filter, limit, search, sortBy, sortOrder, fetchAll, q },
  ) => {
    const client = await createClient(connection, context.debug.enabled);

    const data = await paginateRecordsWithLink<Group>(client, "/groups", fetchAll, {
      q,
      after,
      filter,
      limit,
      search,
      sortBy,
      sortOrder,
      ...extraParameters,
    });

    return {
      data,
    };
  },
  examplePayload: listGroupsExamplePayload,
});
