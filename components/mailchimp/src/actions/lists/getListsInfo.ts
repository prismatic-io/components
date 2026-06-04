import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { offset, count, fetchAll, connectionInput } from "../../inputs";
import { paginatedRequest } from "../../utils/pagination";

export const getListsInfo = action({
  display: {
    label: "Get Lists Info",
    description: "Get information about all lists in the account",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);

    return paginatedRequest({
      client,
      endpoint: "/lists",
      dataKey: "lists",
      fetchAll: params.fetchAll,
      count: params.count,
      offset: params.offset,
    });
  },
  inputs: { offset, count, fetchAll, connection: connectionInput },
});

export default getListsInfo;
