import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getTeamExamplePayload } from "../../examplePayloads";
import { getTeamInputs } from "../../inputs";
export const getTeam = action({
  display: {
    label: "Get Team",
    description: "Get the information and metadata of a team.",
  },
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
});
