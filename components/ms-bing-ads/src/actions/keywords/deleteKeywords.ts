import { action } from "@prismatic-io/spectral";
import { deleteKeywordsExamplePayload } from "../../examplePayloads";
import { deleteKeywordsInputs } from "../../inputs/keywords";
import { getRestClient } from "../../restClient";
import type { MutateRestResponse } from "../../types";

export const deleteKeywords = action({
  display: {
    label: "Delete Keywords",
    description: "Deletes one or more keywords from the specified ad group.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, adGroupId, keywordIds },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.delete<MutateRestResponse>("/Keywords", {
      data: { AdGroupId: adGroupId, KeywordIds: keywordIds },
    });

    return { data };
  },
  inputs: deleteKeywordsInputs,
  examplePayload: deleteKeywordsExamplePayload,
});
