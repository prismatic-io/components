import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { getTeamMembersExamplePayload } from "../../examplePayloads/teams";
import { getTeamMembersInputs } from "../../inputs";






export const getTeamMembers = action({
  display: {
    label: "Get Team Members",
    description: "Retrieve all members of a specific team.",
  },
  inputs: getTeamMembersInputs,
  perform: async (context, { ssvConnection, teamId }) => {
    const client = await createSsvClient(ssvConnection, context);
    const { data } = await client.get(`/v3/team/${teamId}/members`);

    return { data };
  },
  examplePayload: getTeamMembersExamplePayload,
});
