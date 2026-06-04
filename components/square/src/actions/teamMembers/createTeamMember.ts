import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { createTeamMemberExamplePayload } from "../../examplePayloads";
import { createTeamMemberInputs } from "../../inputs";

export const createTeamMember = action({
  display: {
    label: "Create Team Member",
    description: "Creates a new team member.",
  },
  perform: async (context, { teamMember, idempotencyKey, squareConnection }) => {
    
    if (!teamMember.given_name || !teamMember.family_name) {
      throw new Error("`given_name` and `family_name` are required for a team member.");
    }

    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestBody = {
      idempotency_key: idempotencyKey,
      team_member: {
        given_name: teamMember.given_name,
        family_name: teamMember.family_name,
        email_address: teamMember.email_address,
        phone_number: teamMember.phone_number,
        reference_id: teamMember.reference_id,
        status: teamMember.status,
        assigned_locations: teamMember.assigned_locations
          ? {
              assignment_type: teamMember.assigned_locations.assignment_type,
              location_ids: teamMember.assigned_locations.location_ids,
            }
          : undefined,
      },
    };

    const response = await client.request({
      url: "/v2/team-members",
      method: "POST",
      data: requestBody,
    });

    return {
      data: response.data,
    };
  },
  inputs: createTeamMemberInputs,
  examplePayload: createTeamMemberExamplePayload,
});
