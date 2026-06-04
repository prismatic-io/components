import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { selectTeamMemberInputs } from "../inputs";
import { fetchAllPages, sortByLabel } from "../util";

export const selectTeamMember = dataSource({
  display: {
    label: "Select Team Member",
    description: "Lists team members in the Square account.",
  },
  inputs: selectTeamMemberInputs,
  perform: async (_context, { squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection);

    const allTeamMembers = await fetchAllPages(client, "/v2/team-members/search", "team_members", {
      method: "POST",
    });

    const result = (allTeamMembers.team_members as Record<string, unknown>[])
      .map((member: Record<string, unknown>) => ({
        label:
          `${(member.given_name as string) || ""} ${(member.family_name as string) || ""}`.trim() ||
          (member.id as string),
        key: member.id as string,
      }))
      .sort(sortByLabel);

    return {
      result,
    };
  },
  dataSourceType: "picklist",
});
