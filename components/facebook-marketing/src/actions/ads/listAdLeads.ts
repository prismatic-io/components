import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAdLeadsResponse } from "../../examplePayloads";
import { listAdLeadsInputs } from "../../inputs";
export const listAdLeads = action({
  display: {
    label: "List Ad Leads",
    description: "List all ad leads for the given ad.",
  },
  perform: async (
    context,
    { version, connection, adId, pagination, fields },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await client.get(`/${adId}/leads`, {
      params: {
        limit: pagination.limit,
        before: pagination.before,
        after: pagination.after,
        fields,
      },
    });
    return {
      data,
    };
  },
  inputs: listAdLeadsInputs,
  examplePayload: listAdLeadsResponse,
});
