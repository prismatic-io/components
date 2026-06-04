export const retrieveUserExamplePayload = {
  data: {
    id: "553c3ef8b8cdcd1501ba123a",
    alias: "Green Fish",
    avatarURL: "https://canny.io/images/a3db0133d1e7d9122832b67b2c4caaaa.jpg",
    created: "2026-04-16T01:07:22.192Z",
    customFields: {
      field1: "value1",
      field2: "value2",
    },
    email: "test@test.test",
    isAdmin: false,
    lastActivity: "2026-04-16T01:07:22.192Z",
    name: "Sally Doe",
    url: "https://your-company.canny.io/admin/users/sally-doe",
    userID: "1234",
  },
};

export const listUsersExamplePayload = {
  data: {
    hasNextPage: true,
    cursor:
      "NTUzYzNlZjhiOGNkY2QxNTAxYmExMjNhXzIwMjUtMDItMDRUMTY6NDA6MDcuNTQxWl8x",
    users: [
      {
        id: "553c3ef8b8cdcd1501ba123a",
        alias: "Green Fish",
        avatarURL:
          "https://canny.io/images/a3db0133d1e7d9122832b67b2c4caaaa.jpg",
        created: "2026-04-16T01:07:21.973Z",
        customFields: {
          field1: "value1",
          field2: "value2",
        },
        email: "test@test.test",
        isAdmin: false,
        lastActivity: "2026-04-16T01:07:21.973Z",
        name: "Sally Doe",
        url: "https://your-company.canny.io/admin/users/sally-doe",
        userID: "1234",
      },
    ],
  },
};

export const createOrUpdateUserExamplePayload = {
  data: { id: "553c3ef8b8cdcd1501ba9999" },
};

export const deleteUserExamplePayload = { data: "success" };
