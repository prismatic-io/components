import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { retrieveTeamMemberExamplePayload } from "../../examplePayloads";
import { retrieveTeamMemberInputs } from "../../inputs";

export const retrieveTeamMember = action({
  display: {
    label: "Retrieve Team Member",
    description: "Retrieves a team member based on the provided ID.",
  },
  perform: async (context, { teamMemberId, squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.request({
      url: `/v2/team-members/${teamMemberId}`,
      method: "GET",
    });

    return {
      data: response.data,
    };
  },
  inputs: retrieveTeamMemberInputs,
  examplePayload: retrieveTeamMemberExamplePayload,
});
