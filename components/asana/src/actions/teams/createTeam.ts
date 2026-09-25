import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { createTeamExamplePayload } from "../../examplePayloads";
import { createTeamInputs } from "../../inputs";
import { teamResponseSchema } from "../../outputSchemas";
export const createTeam = action({
  display: {
    label: "Create Team",
    description: "Create a new team within an organization.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/teams`, {
      data: {
        description: params.teamDescription,
        name: params.teamName,
        organization: params.organizationId,
      },
    });
    return { data };
  },
  inputs: createTeamInputs,
  examplePayload: createTeamExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: teamResponseSchema,
  }),
});
