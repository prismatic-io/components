import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listUsersInTeamExamplePayload } from "../../examplePayloads";
import { listUsersInTeamInputs } from "../../inputs";
import { listUsersOutputSchema } from "../../outputSchemas";
export const listUsersInTeam = action({
  display: {
    label: "List Users in Team",
    description: "List all users within a given team.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/teams/${params.teamId}/users`, {
      params: {
        offset: params.offset,
        limit: params.limit,
        workspace: params.workspaceId,
      },
    });
    return { data };
  },
  inputs: listUsersInTeamInputs,
  examplePayload: listUsersInTeamExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listUsersOutputSchema,
  }),
  performSafety: PerformSafety.SAFE,
});
