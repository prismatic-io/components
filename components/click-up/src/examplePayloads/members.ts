








const memberObject = {
  id: 81942673,
  username: "John Doe",
  email: "john.doe@example.com",
  color: "#7b68ee",
  initials: "JD",
  profilePicture: "https://attachments.clickup.com/profilePictures/81942673_abc.jpg",
  role: 1,
};

export const getListMembersExamplePayload = {
  data: {
    members: [memberObject],
  },
};

export const getTaskMembersExamplePayload = {
  data: {
    members: [memberObject],
  },
};
