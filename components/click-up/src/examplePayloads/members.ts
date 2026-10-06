const memberObject = {
  id: 81942673,
  username: "John Doe",
  email: "john.doe@example.com",
  color: "#7b68ee",
  initials: "JD",
  profilePicture:
    "https://attachments.clickup.com/profilePictures/81942673_abc.jpg",
  role: 1,
  profileInfo: {
    display_profile: null,
    verified_ambassador: null,
    verified_consultant: null,
    top_tier_user: null,
    viewed_verified_ambassador: null,
    viewed_verified_consultant: null,
    viewed_top_tier_user: null,
  },
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
