import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getTeamExamplePayload } from "../../examplePayloads";
import { getTeamInputs } from "../../inputs";
import { teamResponseSchema } from "../../outputSchemas";
export const getTeam = action({
  display: {
    label: "Get Team",
    description: "Get the information and metadata of a team.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/teams/${params.teamId}`);
    return { data };
  },
  inputs: getTeamInputs,
  examplePayload: getTeamExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: teamResponseSchema,
  }),
});
