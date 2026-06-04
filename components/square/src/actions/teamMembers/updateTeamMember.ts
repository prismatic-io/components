import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { updateTeamMemberExamplePayload } from "../../examplePayloads";
import { updateTeamMemberInputs } from "../../inputs";

export const updateTeamMember = action({
  display: {
    label: "Update Team Member",
    description: "Updates a team member.",
  },
  perform: async (context, { teamMemberId, teamMember, squareConnection }) => {
    
    if (!teamMember.given_name || !teamMember.family_name) {
      throw new Error("`given_name` and `family_name` are required for a team member.");
    }

    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestBody = {
      team_member: {
        reference_id: teamMember.reference_id,
        status: teamMember.status,
        given_name: teamMember.given_name,
        family_name: teamMember.family_name,
        email_address: teamMember.email_address,
        phone_number: teamMember.phone_number,
        assigned_locations: teamMember.assigned_locations
          ? {
              assignment_type: teamMember.assigned_locations.assignment_type,
              location_ids: teamMember.assigned_locations.location_ids,
            }
          : undefined,
      },
    };

    const response = await client.request({
      url: `/v2/team-members/${teamMemberId}`,
      method: "PUT",
      data: requestBody,
    });

    return {
      data: response.data,
    };
  },
  inputs: updateTeamMemberInputs,
  examplePayload: updateTeamMemberExamplePayload,
});
