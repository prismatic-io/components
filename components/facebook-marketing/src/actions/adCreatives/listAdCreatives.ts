import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAdCreativesResponse } from "../../examplePayloads";
import { listAdCreativesInputs } from "../../inputs";
import { getPaginatedData } from "../../util";
export const listAdCreatives = action({
  display: {
    label: "List Ad Creatives",
    description: "List all ad creatives in a given ad account.",
  },
  perform: async (
    context,
    { version, connection, adAccountId, fetchAll, pagination, fields },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await getPaginatedData(
      client,
      `/${adAccountId}/adcreatives`,
      fetchAll,
      {
        limit: pagination.limit,
        before: pagination.before,
        after: pagination.after,
        fields,
      },
    );
    return {
      data,
    };
  },
  inputs: listAdCreativesInputs,
  examplePayload: listAdCreativesResponse,
});
