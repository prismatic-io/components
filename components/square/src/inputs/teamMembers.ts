import { input, util } from "@prismatic-io/spectral";
import { cursor, idempotencyKey, limit, squareConnection } from "./common";

const teamMember = input({
  label: "Team Member",
  type: "code",
  language: "json",
  example: JSON.stringify(
    {
      reference_id: "employee-001",
      status: "ACTIVE",
      given_name: "John",
      family_name: "Doe",
      email_address: "john.doe@example.com",
      phone_number: "+14155552671",
      assigned_locations: {
        assignment_type: "EXPLICIT_LOCATIONS",
        location_ids: ["LH2G9VFHJRWKR"],
      },
    },
    null,
    2,
  ),
  required: true,
  comments:
    "The team member data in JSON format. See [Square TeamMember Object](https://developer.squareup.com/reference/square/objects/TeamMember) for field details.",
  clean: (teamMemberInput) => {
    if (!util.types.isJSON(util.types.toString(teamMemberInput))) {
      throw new Error("Invalid JSON provided for Team Member.");
    }
    return JSON.parse(util.types.toString(teamMemberInput));
  },
});

const searchQuery = input({
  label: "Search Query",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      filter: {
        location_ids: ["LH2G9VFHJRWKR"],
        status: "ACTIVE",
        is_owner: false,
      },
    },
    null,
    2,
  ),
  required: true,
  comments:
    "The query parameters to filter team members. See [Square Search Team Members](https://developer.squareup.com/reference/square/team-api/search-team-members) for filter options.",
  clean: (searchQueryInput) => {
    if (!util.types.isJSON(util.types.toString(searchQueryInput))) {
      throw new Error("Invalid JSON provided for Search Query.");
    }
    return JSON.parse(util.types.toString(searchQueryInput));
  },
});

const teamMemberId = input({
  label: "Team Member ID",
  type: "string",
  example: "1yJlHapkseYnNPETIU1B",
  placeholder: "Enter Team Member ID",
  required: true,
  comments: "The unique identifier for the team member.",
  dataSource: "selectTeamMember",
  clean: util.types.toString,
});

export const createTeamMemberInputs = {
  squareConnection,
  teamMember,
  idempotencyKey,
};

export const searchTeamMembersInputs = {
  squareConnection,
  searchQuery,
  cursor,
  limit,
};

export const retrieveTeamMemberInputs = {
  squareConnection,
  teamMemberId,
};

export const updateTeamMemberInputs = {
  squareConnection,
  teamMemberId,
  teamMember,
};
