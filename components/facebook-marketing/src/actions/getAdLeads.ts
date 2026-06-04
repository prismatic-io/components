import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";

import {
  adId,
  after,
  before,
  fields,
  limit,
  myConnectionField,
  version,
} from "../inputs";

export const listAdLeads = action({
  display: {
    label: "List Ad Leads",
    description: "List all ad leads for the given ad.",
  },
  perform: async (
    context,
    { version, connection, adId, limit, before, after, fields },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);

    const { data } = await client.get(`/${adId}/leads`, {
      params: {
        limit,
        before,
        after,
        fields,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection: myConnectionField,
    adId: { ...adId, comments: "The ID of the ad to list leads for." },
    limit,
    before,
    after,
    fields: { ...fields, default: "name" },
    version,
  },
});
