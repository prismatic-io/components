import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, dealIdInput, paginationLimitInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getDealFollowers = action({
  display: {
    label: "Get Deal Followers",
    description: "Lists followers of a deal.",
  },
  perform: async (context, { connection, id, limit, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get(`/deals/${id}/followers`, {
      params: {
        limit,
        cursor,
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
    limit: paginationLimitInput,
    cursor,
  },
});
