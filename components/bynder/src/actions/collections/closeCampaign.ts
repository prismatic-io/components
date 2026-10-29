import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { connection, id } from "../../inputs";

export const closeCampaign = action({
  display: {
    label: "Close Campaign",
    description: "Delete an existing campaign",
  },
  inputs: {
    id: {
      ...id,
      label: "Campaign ID",
      comments: "The ID of the campaign to delete",
      dataSource: "selectCampaign",
    },
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.post(`/workflow/campaigns/${id}/close`);
    return { data };
  },
  examplePayload: {
    data: {},
  },
});
