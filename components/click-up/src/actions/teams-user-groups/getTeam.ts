import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getTeamExamplePayload } from "../../examplePayloads";
import { connectionInput, getTeamId, groupIds } from "../../inputs";

const teamId = getTeamId(false);

interface QueryParams {
  team_id?: string;
  group_ids?: string;
}

export const getTeam = action({
  display: {
    label: "Get Team",
    description: "Retrieve user groups (Teams) in a workspace.",
  },
  examplePayload: getTeamExamplePayload,
  perform: async (context, { clickUpConnection, teamId, groupIds }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const queryParams: QueryParams = {};

    if (teamId?.length) queryParams.team_id = teamId;

    if (groupIds?.length) queryParams.group_ids = groupIds;
    const { data } = await client.get("/group", { params: queryParams });

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
    groupIds,
  },
});
