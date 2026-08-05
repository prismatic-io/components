import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { addUserToTeamExamplePayload } from "../../examplePayloads";
import { addUserToTeamInputs } from "../../inputs";
export const addUserToTeam = action({
  display: {
    label: "Add User to Team",
    description: "Add an existing user to the given team.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/teams/${params.teamId}/addUser`, {
      data: { user: params.userId },
    });
    return { data };
  },
  inputs: addUserToTeamInputs,
  examplePayload: addUserToTeamExamplePayload,
});
