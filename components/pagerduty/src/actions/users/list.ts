import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listUsersExamplePayloads } from "../../examplePayloads";
import {
  connectionInput,
  fetchAll,
  includeAttributes,
  limit,
  offset,
  query,
  teamIds,
  total,
} from "../../inputs";
import { fetchAllWithPagination } from "../../util/fetchAllWithPagination";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "List all users with optional filters.",
  },
  perform: async (
    context,
    { connection, query, teamIds, limit, offset, fetchAll, total, include },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      query,
      "team_ids[]": teamIds,
      limit,
      offset,
      total,
      "include[]": include,
    };

    if (fetchAll) {
      return {
        data: await fetchAllWithPagination({
          client,
          configVars: params,
          endpoint: ENDPOINTS.USERS,
          objectKey: "users",
        }),
      };
    }

    const { data } = await client.get(ENDPOINTS.USERS, {
      params,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    query,
    teamIds,
    limit,
    offset,
    total,
    include: includeAttributes,
  },
  examplePayload: listUsersExamplePayloads,
});
