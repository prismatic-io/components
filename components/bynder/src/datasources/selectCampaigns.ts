import { dataSource, type Element } from "@prismatic-io/spectral";
import { createWorkflowClient } from "../client";
import { selectCampaignResponse } from "../examplePayloads";
import { connection } from "../inputs";
import type { Records } from "../types";
import { sortArray } from "../util";

export const selectCampaign = dataSource({
  display: {
    label: "Select Campaign",
    description:
      "Select a campaign from the list of campaigns available in Bynder.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createWorkflowClient(connection, false);
    const { data } = await client.get(`/campaigns`);
    if (Array.isArray(data)) {
      const objects = sortArray<Records>(data, "name").map<Element>(
        (campaign) => ({
          key: campaign.ID.toString(),
          label: `${campaign.name} (ID: ${campaign.ID})`,
        }),
      );

      return { result: objects };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectCampaignResponse,
  },
});
