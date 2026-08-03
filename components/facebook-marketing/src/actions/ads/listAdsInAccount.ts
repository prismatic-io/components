import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAdsInAccountResponse } from "../../examplePayloads";
import { listAdsInAccountInputs } from "../../inputs";
import { getPaginatedData } from "../../util";
export const listAdsInAccount = action({
  display: {
    label: "List Ads In Account",
    description: "List all ads in an ad account.",
  },
  perform: async (
    context,
    { version, connection, adAccountId, fetchAll, pagination, fields },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await getPaginatedData(
      client,
      `/${adAccountId}/ads`,
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
  inputs: listAdsInAccountInputs,
  examplePayload: listAdsInAccountResponse,
});
