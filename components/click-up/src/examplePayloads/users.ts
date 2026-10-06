const userObject = {
  id: 81942673,
  username: "John Doe",
  email: "john.doe@example.com",
  color: "#7b68ee",
  profilePicture:
    "https://attachments.clickup.com/profilePictures/81942673_abc.jpg",
  initials: "JD",
  role: 3,
  custom_role: {
    id: 998877,
    name: "Project Coordinator",
  },
  last_active: "1704153600000",
  date_joined: "1672531200000",
  date_invited: "1672531200000",
};
const invitedByObject = {
  id: 81942670,
  username: "Jane Smith",
  color: "#e91e63",
  email: "jane.smith@example.com",
  initials: "JS",
  profilePicture:
    "https://attachments.clickup.com/profilePictures/81942670_def.jpg",
};
const memberObject = {
  member: {
    user: userObject,
    invited_by: invitedByObject,
    shared: {
      tasks: [],
      lists: [],
      folders: [],
    },
  },
};
const workspaceRoles = [
  { id: 1, name: "owner", custom: false },
  { id: 2, name: "admin", custom: false },
  { id: 3, name: "member", custom: false },
  { id: 4, name: "guest", custom: false },
];
export const getUserExamplePayload = {
  data: memberObject,
};
export const inviteUserToWorkspaceExamplePayload = {
  data: {
    team: {
      id: "9012345",
      name: "Acme Corp Workspace",
      color: "#536cfe",
      avatar: null,
      members: [
        {
          user: {
            ...userObject,
            last_active: null,
            date_joined: null,
          },
          invited_by: invitedByObject,
        },
      ],
      roles: workspaceRoles,
    },
  },
};
export const editUserOnWorkspaceExamplePayload = {
  data: memberObject,
};
export const removeUserFromWorkspaceExamplePayload = {
  data: {
    team: {
      id: "9012345",
      name: "Acme Corp Workspace",
      color: "#536cfe",
      avatar: null,
      members: [],
    },
  },
};
