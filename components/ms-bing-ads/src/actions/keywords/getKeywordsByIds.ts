import { action } from "@prismatic-io/spectral";
import { getKeywordsByIdsExamplePayload } from "../../examplePayloads";
import { getKeywordsByIdsInputs } from "../../inputs/keywords";
import { getRestClient } from "../../restClient";
import type { QueryRestResponse } from "../../types";

export const getKeywordsByIds = action({
  display: {
    label: "Get Keywords By IDs",
    description: "Gets the specified keywords within the specified ad group.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      accountId,
      customerId,
      adGroupId,
      keywordIds,
      returnAdditionalFields,
    },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<QueryRestResponse>(
      "/Keywords/QueryByIds",
      {
        AdGroupId: adGroupId,
        KeywordIds: keywordIds,
        ReturnAdditionalFields: returnAdditionalFields,
      },
    );

    return { data };
  },
  inputs: getKeywordsByIdsInputs,
  examplePayload: getKeywordsByIdsExamplePayload,
});
