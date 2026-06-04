import { action } from "@prismatic-io/spectral";
import { createWorkflowClient } from "../../client";
import { updateJobResponse } from "../../examplePayloads";
import { bodyData, connection, description, id, name } from "../../inputs";

export const updateJob = action({
  display: {
    label: "Update Job",
    description: "Edit an existing job",
  },
  inputs: {
    id: {
      ...id,
      label: "Job ID",
      comments: "The ID of the job to update",
      required: true,
      dataSource: "selectJob",
    },
    name: {
      ...name,
      comments: "The name of the job",
    },
    campaignID: {
      ...id,
      label: "Campaign ID",
      comments: "Id of the campaign the job is part of",
      required: false,
      dataSource: "selectCampaign",
    },
    accountableID: {
      ...id,
      label: "Accountable ID",
      comments: "Id of the user responsible for the job",
      required: false,
      dataSource: "selectUser",
    },
    description: {
      ...description,
      comments: "The description of the job",
    },
    bodyData: {
      ...bodyData,
      comments: "Additional data to update the job",
      example: JSON.stringify(
        {
          deadline: "2021-12-31T23:59:59Z",
        },
        null,
        2,
      ),
    },
    connection,
  },
  perform: async (
    context,
    { connection, id, accountableID, bodyData, campaignID, description, name },
  ) => {
    const client = createWorkflowClient(connection, context.debug.enabled);
    const { data } = await client.put(`/jobs/${id}`, {
      ...bodyData,
      accountableID,
      campaignID,
      description,
      name,
    });
    return { data };
  },
  examplePayload: {
    data: updateJobResponse,
  },
});
