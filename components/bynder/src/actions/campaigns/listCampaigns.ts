import { action } from "@prismatic-io/spectral";
import { createWorkflowClient } from "../../client";
import { listCampaignsResponse } from "../../examplePayloads";
import { connection } from "../../inputs";

export const listCampaigns = action({
  display: {
    label: "List Campaigns",
    description: "Retrieve all campaigns",
  },
  inputs: {
    connection,
  },
  perform: async (context, { connection }) => {
    const client = createWorkflowClient(connection, context.debug.enabled);
    const { data } = await client.get(`/campaigns`);
    return { data };
  },
  examplePayload: {
    data: listCampaignsResponse,
  },
});
