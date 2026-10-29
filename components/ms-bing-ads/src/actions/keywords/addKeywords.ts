import { action } from "@prismatic-io/spectral";
import { addKeywordsExamplePayload } from "../../examplePayloads";
import { addKeywordsInputs } from "../../inputs/keywords";
import { getRestClient } from "../../restClient";
import type { AddRestResponse } from "../../types";

export const addKeywords = action({
  display: {
    label: "Add Keywords",
    description: "Creates one or more keywords within the specified ad group.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, adGroupId, keywords },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<AddRestResponse>("/Keywords", {
      AdGroupId: adGroupId,
      Keywords: keywords,
    });

    return { data };
  },
  inputs: addKeywordsInputs,
  examplePayload: addKeywordsExamplePayload,
});
