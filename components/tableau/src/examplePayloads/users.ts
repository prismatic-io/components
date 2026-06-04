const userObject = {
  id: "9f9e9d9c-8b8a-7978-6756-5f5e5d5c5b5a",
  name: "jane.smith@example.com",
  fullName: "Jane Smith",
  email: "jane.smith@example.com",
  siteRole: "Explorer",
  authSetting: "ServerDefault",
  lastLogin: "2024-08-15T09:22:18Z",
  externalAuthUserId: "",
  locale: "en",
  language: "en",
};

export const listUsersExamplePayload = {
  data: {
    pagination: {
      pageNumber: "1",
      pageSize: "100",
      totalAvailable: "25",
    },
    users: {
      user: [userObject],
    },
  },
};

export const searchUsersExamplePayload = listUsersExamplePayload;

export const getUserExamplePayload = {
  data: {
    user: userObject,
  },
};

export const createUserExamplePayload = {
  data: {
    user: userObject,
  },
};

export const updateUserExamplePayload = {
  data: {
    user: userObject,
  },
};

export const deleteUserExamplePayload = {
  data: null,
};
