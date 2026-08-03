import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAdSetsInAccountResponse } from "../../examplePayloads";
import { listAdSetsInAccountInputs } from "../../inputs";
import { getPaginatedData } from "../../util";
export const listAdSetsInAccount = action({
  display: {
    label: "List Ad Sets In Account",
    description: "List all ad sets in an ad account.",
  },
  perform: async (
    context,
    { version, connection, adAccountId, fetchAll, pagination, fields },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await getPaginatedData(
      client,
      `/${adAccountId}/adsets`,
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
  inputs: listAdSetsInAccountInputs,
  examplePayload: listAdSetsInAccountResponse,
});
