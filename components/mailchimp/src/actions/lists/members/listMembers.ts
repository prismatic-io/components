import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  listId,
  offset,
  count,
  fetchAll,
  connectionInput,
} from "../../../inputs";
import { paginatedRequest } from "../../../utils/pagination";

export const listMembers = action({
  display: {
    label: "List Members",
    description: "Get information about members in a specific Mailchimp list",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);

    return paginatedRequest({
      client,
      endpoint: `/lists/${params.listId}/members`,
      dataKey: "members",
      fetchAll: params.fetchAll,
      count: params.count,
      offset: params.offset,
    });
  },
  inputs: { listId, count, offset, fetchAll, connection: connectionInput },
  examplePayload: { data: {} },
});

export default listMembers;
