import { action } from "@prismatic-io/spectral";
import { createWorkflowClient } from "../../client";
import { createCampaignResponse as updateCampaignResponse } from "../../examplePayloads";
import {
  bodyData,
  connection,
  description,
  id,
  key,
  name,
  responsibleId,
} from "../../inputs";

export const updateCampaign = action({
  display: {
    label: "Update Campaign",
    description: "Edit an existing campaign",
  },
  inputs: {
    id: {
      ...id,
      label: "Campaign ID",
      comments: "The ID of the campaign to update",
      required: true,
      dataSource: "selectCampaign",
    },
    name: {
      ...name,
      comments: "The name of the campaign",
      required: true,
    },
    key,
    responsibleID: {
      ...responsibleId,
      dataSource: "selectUser",
    },
    description: {
      ...description,
      comments: "The description of the campaign",
      required: true,
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
    { connection, bodyData, description, key, name, responsibleID, id },
  ) => {
    const client = createWorkflowClient(connection, context.debug.enabled);
    const { data } = await client.put(`/campaigns/${id}`, {
      ...bodyData,
      description,
      key,
      name,
      responsibleID,
    });
    return { data };
  },
  examplePayload: {
    data: updateCampaignResponse,
  },
});
