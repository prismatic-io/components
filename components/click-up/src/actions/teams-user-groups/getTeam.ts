import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getTeamExamplePayload } from "../../examplePayloads";
import { getTeamInputs } from "../../inputs";
import { getTeamOutputSchema } from "../../outputSchemas";
import type { GetTeamQueryParams as QueryParams } from "../../types";
export const getTeam = action({
  display: {
    label: "Get Team",
    description: "Retrieve user groups (Teams) in a workspace.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTeamOutputSchema,
  }),
  examplePayload: getTeamExamplePayload,
  performSafety: "safe",
  perform: async (context, { clickUpConnection, teamId, groupIds }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const queryParams: QueryParams = {};
    if (teamId?.length) queryParams.team_id = teamId;
    if (groupIds?.length) queryParams.group_ids = groupIds;
    const { data } = await client.get("/group", { params: queryParams });
    return {
      data,
    };
  },
  inputs: getTeamInputs,
});
