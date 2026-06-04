import { action } from "@prismatic-io/spectral";
import { createWorkflowClient } from "../../client";
import { createJobResponse } from "../../examplePayloads";
import { bodyData, connection, description, id, name } from "../../inputs";

export const createJob = action({
  display: {
    label: "Create Job",
    description: "Create a new job",
  },
  inputs: {
    name: {
      ...name,
      comments: "The name of the job",
      required: true,
    },
    campaignID: {
      ...id,
      label: "Campaign ID",
      comments: "Id of the campaign the job is part of",
      required: true,
      dataSource: "selectCampaign",
    },
    accountableID: {
      ...id,
      label: "Accountable ID",
      comments: "Id of the user responsible for the job",
      required: true,
      dataSource: "selectUser",
    },
    presetID: {
      ...id,
      label: "Preset ID",
      comments: "Id of the preset the job should be created from",
      required: true,
    },
    description: {
      ...description,
      comments: "The description of the job",
    },
    bodyData: {
      ...bodyData,
      comments: "Additional data to create the job",
      example: JSON.stringify(
        {
          deadline: "2021-12-31T23:59:59Z",
          stages: [{ name: "Stage 1" }, { name: "Stage 2" }],
        },
        null,
        2,
      ),
    },
    connection,
  },
  perform: async (
    context,
    {
      connection,
      accountableID,
      bodyData,
      campaignID,
      description,
      name,
      presetID,
    },
  ) => {
    const client = createWorkflowClient(connection, context.debug.enabled);
    const { data } = await client.post(`/jobs`, {
      ...bodyData,
      accountableID,
      campaignID,
      description,
      name,
      presetID,
    });
    return { data };
  },
  examplePayload: {
    data: createJobResponse,
  },
});
