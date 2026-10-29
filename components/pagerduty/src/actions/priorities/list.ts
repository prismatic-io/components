import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listPrioritiesExamplePayloads } from "../../examplePayloads";
import { connectionInput, fetchAll, limit, offset, total } from "../../inputs";
import { fetchAllWithPagination } from "../../util/fetchAllWithPagination";

export const listPriorities = action({
  display: {
    label: "List Priorities",
    description: "List available incident priorities.",
  },
  perform: async (context, { connection, limit, offset, total, fetchAll }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = { limit, offset, total };

    if (fetchAll) {
      return {
        data: await fetchAllWithPagination({
          client,
          configVars: params,
          endpoint: ENDPOINTS.PRIORITIES,
          objectKey: "priorities",
        }),
      };
    }

    const { data } = await client.get(ENDPOINTS.PRIORITIES, {
      params,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    limit,
    offset,
    total,
  },
  examplePayload: listPrioritiesExamplePayloads,
});
