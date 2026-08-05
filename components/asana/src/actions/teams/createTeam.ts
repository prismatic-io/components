import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { createTeamExamplePayload } from "../../examplePayloads";
import { createTeamInputs } from "../../inputs";
export const createTeam = action({
  display: {
    label: "Create Team",
    description: "Create a new team within an organization.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/teams`, {
      data: {
        description: params.teamDescription || undefined,
        name: params.teamName,
        organization: params.organizationId || undefined,
      },
    });
    return { data };
  },
  inputs: createTeamInputs,
  examplePayload: createTeamExamplePayload,
});
