import { action } from "@prismatic-io/spectral";
import { createWorkflowClient } from "../../client";
import { createCampaignResponse } from "../../examplePayloads";
import {
  bodyData,
  connection,
  description,
  key,
  name,
  responsibleId,
} from "../../inputs";

export const createCampaign = action({
  display: {
    label: "Create Campaign",
    description: "Create a new campaign",
  },
  inputs: {
    name: {
      ...name,
      comments: "The name of the campaign",
      required: true,
    },
    key,
    description: {
      ...description,
      comments: "The description of the campaign",
      required: true,
    },
    responsibleID: {
      ...responsibleId,
      dataSource: "selectUser",
    },
    bodyData: {
      ...bodyData,
      comments: "Additional data to update the campaign",
      example: JSON.stringify(
        {
          dateStart: "2021-01-01T00:00:00Z",
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
    { connection, bodyData, description, key, name, responsibleID },
  ) => {
    const client = createWorkflowClient(connection, context.debug.enabled);
    const { data } = await client.post(`/campaigns`, {
      ...bodyData,
      description,
      key,
      name,
      responsibleID,
    });
    return { data };
  },
  examplePayload: {
    data: createCampaignResponse,
  },
});
