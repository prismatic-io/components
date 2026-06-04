



















export const getAuthorizedTeamsExamplePayload = {
  data: {
    teams: [
      {
        id: "9012345",
        name: "Acme Corp Workspace",
        color: "#536cfe",
        avatar: null,
        members: [
          {
            user: {
              id: 81942673,
              username: "John Doe",
              email: "john.doe@example.com",
              color: "#7b68ee",
              profilePicture: "https://attachments.clickup.com/profilePictures/81942673_abc.jpg",
              initials: "JD",
              role: 1,
              custom_role: null,
              last_active: "1704153600000",
              date_joined: "1672531200000",
              date_invited: "1672531200000",
            },
            invited_by: {
              id: 81942670,
              username: "Jane Smith",
              color: "#e91e63",
              email: "jane.smith@example.com",
              initials: "JS",
              profilePicture: null,
            },
          },
        ],
      },
    ],
  },
};

export const getWorkspaceSeatsExamplePayload = {
  data: {
    members: {
      filled_member_seats: 15,
      total_member_seats: 25,
      empty_member_seats: 10,
    },
    guests: {
      filled_guest_seats: 3,
      total_guest_seats: 10,
      empty_guest_seats: 7,
    },
  },
};

export const getWorkspacePlanExamplePayload = {
  data: {
    plan_id: 3,
    plan_name: "Business",
  },
};

const teamGroupObject = {
  id: "2b4dc017-deb0-4cff-8675-3a4a492e13e4",
  team_id: "9012345",
  userid: 81942673,
  name: "Design Team",
  handle: "design-team",
  date_created: "1704067200000",
  initials: "DT",
  members: [
    {
      id: 81942673,
      username: "John Doe",
      email: "john.doe@example.com",
      color: "#7b68ee",
      initials: "JD",
      profilePicture: null,
    },
  ],
  avatar: {
    attachment_id: null,
    color: "#40bc86",
    icon: null,
  },
};

export const getTeamExamplePayload = {
  data: {
    groups: [teamGroupObject],
  },
};

export const createTeamExamplePayload = {
  data: teamGroupObject,
};

export const updateTeamExamplePayload = {
  data: teamGroupObject,
};

export const deleteTeamExamplePayload = {
  data: null,
};
