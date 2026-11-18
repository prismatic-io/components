import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listMembersFromGroupExamplePayload } from "../../examplePayloads";
import { listMembersFromGroupInputs } from "../../inputs";
import { listMembersFromGroupOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util";

export const listMembersFromGroup = action({
  display: {
    label: "List Group Members",
    description: "List all members of a security or Microsoft 365 group.",
  },
  inputs: listMembersFromGroupInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMembersFromGroupOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, fetchAll, groupId, $top, filters },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $select: filters.$select,
      $filter: filters.$filter,
      $search: filters.$search,
      $expand: filters.$expand,
      $count: filters.$count,
      $top,
    };

    const data = await paginateResults(
      client,
      `${ENDPOINTS.GROUPS}/${groupId}/members`,
      fetchAll,
      params,
    );

    return {
      data,
    };
  },
  examplePerform: async () => listMembersFromGroupExamplePayload,
  examplePayload: listMembersFromGroupExamplePayload,
});
