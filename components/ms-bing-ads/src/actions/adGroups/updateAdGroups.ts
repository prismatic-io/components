import { action } from "@prismatic-io/spectral";
import { updateAdGroupsExamplePayload } from "../../examplePayloads";
import { updateAdGroupsInputs } from "../../inputs/adGroups";
import { getRestClient } from "../../restClient";
import type { MutateRestResponse } from "../../types";

export const updateAdGroups = action({
  display: {
    label: "Update Ad Groups",
    description: "Updates one or more ad groups within the specified campaign.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, campaignId, adGroups },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.put<MutateRestResponse>("/AdGroups", {
      CampaignId: campaignId,
      AdGroups: adGroups,
    });

    return { data };
  },
  inputs: updateAdGroupsInputs,
  examplePayload: updateAdGroupsExamplePayload,
});
