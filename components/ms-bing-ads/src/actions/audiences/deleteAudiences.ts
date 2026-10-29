import { action } from "@prismatic-io/spectral";
import { deleteAudiencesExamplePayload } from "../../examplePayloads";
import { deleteAudiencesInputs } from "../../inputs/audiences";
import { getRestClient } from "../../restClient";
import type { MutateRestResponse } from "../../types";

export const deleteAudiences = action({
  display: {
    label: "Delete Audiences",
    description: "Deletes one or more audiences from the account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, audienceIds },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.delete<MutateRestResponse>("/Audiences", {
      data: { AudienceIds: audienceIds },
    });

    return { data };
  },
  inputs: deleteAudiencesInputs,
  examplePayload: deleteAudiencesExamplePayload,
});
