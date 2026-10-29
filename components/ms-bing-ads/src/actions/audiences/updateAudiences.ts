import { action } from "@prismatic-io/spectral";
import { updateAudiencesExamplePayload } from "../../examplePayloads";
import { updateAudiencesInputs } from "../../inputs/audiences";
import { getRestClient } from "../../restClient";
import type { MutateRestResponse } from "../../types";

export const updateAudiences = action({
  display: {
    label: "Update Audiences",
    description: "Updates one or more audiences within the account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, audiences },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.put<MutateRestResponse>("/Audiences", {
      Audiences: audiences,
    });

    return { data };
  },
  inputs: updateAudiencesInputs,
  examplePayload: updateAudiencesExamplePayload,
});
