import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCampaignsInAccountResponse } from "../../examplePayloads";
import { listCampaignsInAccountInputs } from "../../inputs";
export const listCampaignsInAccount = action({
  display: {
    label: "List Campaigns In Account",
    description: "List all campaigns in an ad account.",
  },
  perform: async (
    context,
    { version, connection, adAccountId, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await client.get(`/${adAccountId}/campaigns`, {
      params: {
        limit: pagination.limit,
        before: pagination.before,
        after: pagination.after,
      },
    });
    return {
      data,
    };
  },
  inputs: listCampaignsInAccountInputs,
  examplePayload: listCampaignsInAccountResponse,
});
