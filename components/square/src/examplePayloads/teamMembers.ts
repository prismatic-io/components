










export const createTeamMemberExamplePayload = {
  data: {
    team_member: {
      id: "1yJlHapkseYnNPETIU1B",
      is_owner: false,
      status: "ACTIVE",
      given_name: "Joe",
      family_name: "Doe",
      email_address: "joe.doe@example.com",
      phone_number: "+1-415-555-1234",
      created_at: "2023-05-15T10:00:00.000Z",
      updated_at: "2023-05-15T10:00:00.000Z",
      assigned_locations: {
        assignment_type: "EXPLICIT_LOCATIONS",
        location_ids: ["L88917AVBK2S5"],
      },
    },
  },
};






export const searchTeamMembersExamplePayload = {
  data: {
    team_members: [
      {
        id: "1yJlHapkseYnNPETIU1B",
        is_owner: false,
        status: "ACTIVE",
        given_name: "Joe",
        family_name: "Doe",
        email_address: "joe.doe@example.com",
        phone_number: "+1-415-555-1234",
        created_at: "2023-05-15T10:00:00.000Z",
        updated_at: "2023-05-15T10:00:00.000Z",
      },
    ],
    cursor: "MTY1Njk2OTU5NjEzMjAwMDAwMA==",
  },
};






export const retrieveTeamMemberExamplePayload = {
  data: {
    team_member: {
      id: "1yJlHapkseYnNPETIU1B",
      is_owner: false,
      status: "ACTIVE",
      given_name: "Joe",
      family_name: "Doe",
      email_address: "joe.doe@example.com",
      phone_number: "+1-415-555-1234",
      created_at: "2023-05-15T10:00:00.000Z",
      updated_at: "2023-05-15T10:00:00.000Z",
      assigned_locations: {
        assignment_type: "EXPLICIT_LOCATIONS",
        location_ids: ["L88917AVBK2S5"],
      },
    },
  },
};






export const updateTeamMemberExamplePayload = {
  data: {
    team_member: {
      id: "1yJlHapkseYnNPETIU1B",
      is_owner: false,
      status: "ACTIVE",
      given_name: "Joseph",
      family_name: "Doe",
      email_address: "joseph.doe@example.com",
      phone_number: "+1-415-555-1234",
      created_at: "2023-05-15T10:00:00.000Z",
      updated_at: "2023-05-16T11:30:00.000Z",
      assigned_locations: {
        assignment_type: "ALL_CURRENT_AND_FUTURE_LOCATIONS",
      },
    },
  },
};
