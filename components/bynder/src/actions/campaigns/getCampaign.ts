import { action } from "@prismatic-io/spectral";
import { createWorkflowClient } from "../../client";
import { getCampaignResponse } from "../../examplePayloads";
import { connection, id } from "../../inputs";

export const getCampaign = action({
  display: {
    label: "Get Campaign",
    description: "Retrieve a specific campaign",
  },
  inputs: {
    id: {
      ...id,
      label: "Campaign ID",
      comments: "The ID of the campaign to retrieve",
      dataSource: "selectCampaign",
    },
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createWorkflowClient(connection, context.debug.enabled);
    const { data } = await client.get(`/campaigns/${id}`);
    return { data };
  },
  examplePayload: {
    data: getCampaignResponse,
  },
});
