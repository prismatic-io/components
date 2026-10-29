import { action } from "@prismatic-io/spectral";
import { addAdGroupsExamplePayload } from "../../examplePayloads";
import { addAdGroupsInputs } from "../../inputs/adGroups";
import { getRestClient } from "../../restClient";
import type { AddRestResponse } from "../../types";

export const addAdGroups = action({
  display: {
    label: "Add Ad Groups",
    description: "Creates one or more ad groups within the specified campaign.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, campaignId, adGroups },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<AddRestResponse>("/AdGroups", {
      CampaignId: campaignId,
      AdGroups: adGroups,
    });

    return { data };
  },
  inputs: addAdGroupsInputs,
  examplePayload: addAdGroupsExamplePayload,
});
