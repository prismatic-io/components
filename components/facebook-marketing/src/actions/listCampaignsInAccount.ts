import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  adAccountId,
  after,
  before,
  limit,
  myConnectionField,
  version,
} from "../inputs";

export const listCampaignsInAccount = action({
  display: {
    label: "List Campaigns In Account",
    description: "List all campaigns in an ad account.",
  },
  perform: async (
    context,
    { version, connection, adAccountId, limit, before, after },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);

    const { data } = await client.get(`/${adAccountId}/campaigns`, {
      params: {
        limit,
        before,
        after,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection: myConnectionField,
    adAccountId,
    limit,
    before,
    after,
    version,
  },
});
