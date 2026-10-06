import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createTeamExamplePayload } from "../../examplePayloads";
import { createTeamInputs } from "../../inputs";
import { createTeamOutputSchema } from "../../outputSchemas";
export const createTeam = action({
  display: {
    label: "Create Team",
    description:
      "Create a user group (Team) of users that can be assigned to items in a workspace.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createTeamOutputSchema,
  }),
  examplePayload: createTeamExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { clickUpConnection, teamId, name, members }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const body = {
      name,
      members,
    };
    const { data } = await client.post(`/team/${teamId}/group`, body);
    return {
      data,
    };
  },
  examplePerform: async (_context, { name }) => ({
    data: {
      ...createTeamExamplePayload.data,
      name,
    },
  }),
  inputs: createTeamInputs,
});
