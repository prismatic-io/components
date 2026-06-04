
























const guestObject = {
  guest: {
    id: 40237592,
    username: "External Reviewer",
    email: "reviewer@partner-company.com",
    color: "#e91e63",
    initials: "ER",
    profilePicture: null,
    can_edit_tags: true,
    can_see_time_spent: true,
    can_see_time_estimated: true,
    can_create_views: false,
    custom_role_id: null,
  },
};

export const getGuestExamplePayload = {
  data: guestObject,
};

export const inviteGuestToWorkspaceExamplePayload = {
  data: guestObject,
};

export const editGuestOnWorkspaceExamplePayload = {
  data: guestObject,
};

export const removeGuestFromWorkspaceExamplePayload = {
  data: null,
};

export const addGuestToTaskExamplePayload = {
  data: guestObject,
};

export const removeGuestFromTaskExamplePayload = {
  data: null,
};

export const addGuestToListExamplePayload = {
  data: guestObject,
};

export const removeGuestFromListExamplePayload = {
  data: null,
};

export const addGuestToFolderExamplePayload = {
  data: guestObject,
};

export const removeGuestFromFolderExamplePayload = {
  data: null,
};
