import { action } from "@prismatic-io/spectral";
import { getKeywordsByAdGroupIdExamplePayload } from "../../examplePayloads";
import { getKeywordsByAdGroupIdInputs } from "../../inputs/keywords";
import { getRestClient } from "../../restClient";
import type { QueryRestResponse } from "../../types";

export const getKeywordsByAdGroupId = action({
  display: {
    label: "Get Keywords By Ad Group ID",
    description: "Gets the keywords that belong to the specified ad group.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, adGroupId, returnAdditionalFields },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<QueryRestResponse>(
      "/Keywords/QueryByAdGroupId",
      {
        AdGroupId: adGroupId,
        ReturnAdditionalFields: returnAdditionalFields,
      },
    );

    return { data };
  },
  inputs: getKeywordsByAdGroupIdInputs,
  examplePayload: getKeywordsByAdGroupIdExamplePayload,
});
