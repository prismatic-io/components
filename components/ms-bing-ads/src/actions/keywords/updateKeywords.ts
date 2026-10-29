import { action } from "@prismatic-io/spectral";
import { updateKeywordsExamplePayload } from "../../examplePayloads";
import { updateKeywordsInputs } from "../../inputs/keywords";
import { getRestClient } from "../../restClient";
import type { MutateRestResponse } from "../../types";

export const updateKeywords = action({
  display: {
    label: "Update Keywords",
    description: "Updates one or more keywords within the specified ad group.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, adGroupId, keywords },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.put<MutateRestResponse>("/Keywords", {
      AdGroupId: adGroupId,
      Keywords: keywords,
    });

    return { data };
  },
  inputs: updateKeywordsInputs,
  examplePayload: updateKeywordsExamplePayload,
});
