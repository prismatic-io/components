import { action } from "@prismatic-io/spectral";
import { createWorkflowClient } from "../../client";
import { listJobsResponse } from "../../examplePayloads";
import { connection, extraParams, id, limit, page } from "../../inputs";

export const listJobsByCampaign = action({
  display: {
    label: "List Jobs By Campaign",
    description: "Retrieve jobs tied to a campaign",
  },
  inputs: {
    id: {
      ...id,
      label: "Campaign ID",
      comments: "The ID of the campaign to retrieve jobs for",
      required: true,
      dataSource: "selectCampaign",
    },
    page,
    limit,
    extraParams,
    connection,
  },
  perform: async (context, { connection, limit, page, id, extraParams }) => {
    const client = createWorkflowClient(connection, context.debug.enabled);
    const { data, headers } = await client.get(`/campaigns/${id}/jobs`, {
      params: {
        page,
        limit,
        ...extraParams,
      },
    });
    return { data, headers: headers as Record<string, string> };
  },
  examplePayload: {
    data: listJobsResponse,
    headers: {} as Record<string, string>,
  },
});
