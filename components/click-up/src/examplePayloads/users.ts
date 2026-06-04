













const userObject = {
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
};

export const getUserExamplePayload = {
  data: {
    user: userObject,
  },
};

export const inviteUserToWorkspaceExamplePayload = {
  data: {
    user: userObject,
  },
};

export const editUserOnWorkspaceExamplePayload = {
  data: {
    user: userObject,
  },
};

export const removeUserFromWorkspaceExamplePayload = {
  data: null,
};
