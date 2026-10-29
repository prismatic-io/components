import { action } from "@prismatic-io/spectral";
import { addAudiencesExamplePayload } from "../../examplePayloads";
import { addAudiencesInputs } from "../../inputs/audiences";
import { getRestClient } from "../../restClient";
import type { AddRestResponse } from "../../types";

export const addAudiences = action({
  display: {
    label: "Add Audiences",
    description: "Creates one or more audiences within the account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, audiences },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<AddRestResponse>("/Audiences", {
      Audiences: audiences,
    });

    return { data };
  },
  inputs: addAudiencesInputs,
  examplePayload: addAudiencesExamplePayload,
});
