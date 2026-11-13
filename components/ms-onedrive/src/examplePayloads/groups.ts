export const listGroupsExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#groups",
    value: [
      {
        id: "b8dfe8c7-b6a5-4e3d-8c7b-1a2b3c4d5e6f",
        createdDateTime: "2024-01-15T10:30:00Z",
        displayName: "Project Team",
        description: "Team working on the main project",
        mail: "project-team@contoso.com",
        mailEnabled: true,
        mailNickname: "projectteam",
        securityEnabled: false,
        groupTypes: ["Unified"],
      },
      {
        id: "c9eff9d8-c7b6-4f4e-9d8c-2b3c4d5e6f7a",
        createdDateTime: "2024-02-20T08:15:00Z",
        displayName: "Engineering",
        description: "Engineering department",
        mail: "engineering@contoso.com",
        mailEnabled: true,
        mailNickname: "engineering",
        securityEnabled: true,
        groupTypes: ["Unified"],
      },
    ],
  },
};

export const listGroupsDataSourceExamplePayload = {
  result: [
    { label: "Project Team", key: "b8dfe8c7-b6a5-4e3d-8c7b-1a2b3c4d5e6f" },
  ],
};
