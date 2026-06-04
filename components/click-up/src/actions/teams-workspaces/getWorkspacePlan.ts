import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getWorkspacePlanExamplePayload } from "../../examplePayloads";
import { connectionInput, getTeamId } from "../../inputs";

const teamId = getTeamId(true);

export const getWorkspacePlan = action({
  display: {
    label: "Get Workspace Plan",
    description: "Retrieve the current plan for a specified workspace.",
  },
  examplePayload: getWorkspacePlanExamplePayload,
  perform: async (context, { clickUpConnection, teamId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.get(`/team/${teamId}/plan`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
  },
});
