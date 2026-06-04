








export const getUserExamplePayload = {
  ok: true,
  user: {
    id: "example",
    color: "example",
    deleted: false,
    real_name: "Example User",
    name: "Example User",
    tz: "America/Chicago",
    profile: {
      title: "example",
      phone: "example",
      skype: "example",
      real_name: "Slackbots",
      real_name_normalized: "example",
      first_name: "example",
      email: "example",
      team: "example",
      display_name: "example",
    },
  },
};

export const listUsersExamplePayload = {
  ok: true,
  members: [
    {
      id: "Exmple",
      team_id: "34700c09vs0zx",
      name: "Example",
      deleted: false,
      color: "37373",
      profile: {
        title: "example",
        phone: "example",
        skype: "example",
        real_name: "Slackbots",
        real_name_normalized: "example",
        always_active: true,
        first_name: "example",
        email: "example",
        team: "example",
        display_name: "example",
      },
    },
  ],
  response_metadata: {
    next_cursor: "",
    scopes: ["admin", "idetify", "channels:read"],
  },
};
