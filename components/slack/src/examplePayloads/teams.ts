export const listTeamsExamplePayload = {
  ok: true,
  teams: [
    {
      id: "T1234567890",
      name: "Example Workspace",
      discoverability: "open",
      primary_owner: {
        user_id: "W1234567890",
        email: "owner@example.com",
      },
      team_url: "https://example-workspace.slack.com/",
    },
    {
      id: "T0987654321",
      name: "Example Engineering",
      discoverability: "invite_only",
      primary_owner: {
        user_id: "W0987654321",
        email: "engineering-owner@example.com",
      },
      team_url: "https://example-engineering.slack.com/",
    },
  ],
  response_metadata: {
    next_cursor: "dGVhbTpUMDk4NzY1NDMyMQ==",
  },
};
