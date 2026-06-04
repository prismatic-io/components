



export const listTeamsExamplePayload = {
  data: [
    {
      id: 4955,
      name: "Engineering Team",
      created_at: 1714764800,
      modified_at: 1714851200,
    },
  ],
};

export const getTeamSystemTypesExamplePayload = {
  data: [
    {
      id: 412,
      name: "Access Control",
      icon: "access-control",
      sort: 0,
      team_id: 4955,
    },
  ],
};

export const getTeamMembersExamplePayload = {
  data: [
    {
      id: 4500,
      email: "user@example.com",
      first_name: "John",
      last_name: "Doe",
      role: "admin",
      team_id: 4955,
      created_at: 1714764800,
    },
  ],
};
