import { action } from "@prismatic-io/spectral";
import { getAudiencesByIdsExamplePayload } from "../../examplePayloads";
import { getAudiencesByIdsInputs } from "../../inputs/audiences";
import { getRestClient } from "../../restClient";
import type { QueryRestResponse } from "../../types";

export const getAudiencesByIds = action({
  display: {
    label: "Get Audiences By IDs",
    description:
      "Gets the specified audiences. When Audience IDs is empty, an Audience Type is required and all audiences of that type in the account are returned.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      accountId,
      customerId,
      audienceIds,
      audienceType,
      returnAdditionalFields,
    },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<QueryRestResponse>(
      "/Audiences/QueryByIds",
      {
        ...(audienceIds.length ? { AudienceIds: audienceIds } : {}),
        Type: audienceType,
        ReturnAdditionalFields: returnAdditionalFields,
      },
    );

    return { data };
  },
  inputs: getAudiencesByIdsInputs,
  examplePayload: getAudiencesByIdsExamplePayload,
});
