import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, count, offset, fetchAll } from "../../inputs";
import { paginatedRequest } from "../../utils/pagination";

export const listCampaigns = action({
  display: {
    label: "List Campaigns",
    description: "Get all campaigns in an account",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);

    return paginatedRequest({
      client,
      endpoint: "/campaigns",
      dataKey: "campaigns",
      fetchAll: params.fetchAll,
      count: params.count,
      offset: params.offset,
    });
  },
  inputs: { count, offset, fetchAll, connection: connectionInput },
});

export default listCampaigns;
