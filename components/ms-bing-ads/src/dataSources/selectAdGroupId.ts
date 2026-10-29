import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { selectAdGroupIdExamplePayload } from "../examplePayloads";
import { selectAdGroupIdInputs } from "../inputs/adGroups";
import { getRestClient } from "../restClient";
import type { AdGroup, QueryRestResponse } from "../types";

export const selectAdGroupId = dataSource({
  display: {
    label: "Select Ad Group ID",
    description: "Gets the ad groups that belong to the specified campaign.",
  },
  perform: async (
    _context,
    { connection, accountId, customerId, campaignId },
  ) => {
    const client = getRestClient({ connection, accountId, customerId });

    const { data: response } = await client.post<QueryRestResponse>(
      "/AdGroups/QueryByCampaignId",
      { CampaignId: campaignId },
    );

    const adGroups = (response?.AdGroups as AdGroup[] | undefined) ?? [];

    const result = adGroups
      .sort((a, b) =>
        util.types.toString(a.Name) < util.types.toString(b.Name) ? -1 : 1,
      )
      .map<Element>((adGroup) => ({
        key: util.types.toString(adGroup.Id),
        label: `${adGroup.Name} (id: ${adGroup.Id})`,
      }));

    return { result };
  },
  inputs: selectAdGroupIdInputs,
  dataSourceType: "picklist",
  examplePayload: selectAdGroupIdExamplePayload,
});
