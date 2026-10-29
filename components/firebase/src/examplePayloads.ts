export const getDocumentExamplePayload = {
  data: {
    data: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "admin",
    },
    id: "aBcDeFgHiJkLmNoPqRsT",
    createTime: new Date("2024-11-15T09:32:17.456Z"),
    updateTime: new Date("2025-01-20T14:08:42.123Z"),
    exists: true,
    readTime: new Date("2025-03-10T11:45:09.789Z"),
  },
};

export const createDocumentExamplePayload = {
  data: {
    id: "aBcDeFgHiJkLmNoPqRsT",
    path: "users/aBcDeFgHiJkLmNoPqRsT",
  },
};

export const removeFieldExamplePayload = {
  data: {
    _writeTime: {
      _seconds: 1741607109,
      _nanoseconds: 789000000,
    },
  } as unknown,
};

export const listDocumentsExamplePayload = {
  data: [
    {
      id: "aBcDeFgHiJkLmNoPqRsT",
      path: "users/aBcDeFgHiJkLmNoPqRsT",
      data: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
    },
  ],
};

export const listCollectionsExamplePayload = {
  data: [
    {
      id: "users",
      path: "users",
    },
  ],
};

export const updateDocumentExamplePayload = {
  data: {
    _writeTime: {
      _seconds: 1741607109,
      _nanoseconds: 789000000,
    },
  } as unknown,
};

export const bulkCreateDocumentsExamplePayload = {
  data: "Documents created successfully.",
};

export const deleteDocumentExamplePayload = {
  data: {
    _writeTime: {
      _seconds: 1741607109,
      _nanoseconds: 789000000,
    },
  } as unknown,
};

export const selectCollectionExamplePayload = {
  result: [
    { key: "users", label: "users" },
    { key: "orders", label: "orders" },
  ],
};

export const selectDocumentExamplePayload = {
  result: [
    { key: "aBcDeFgHiJkLmNoPqRsT", label: "users/aBcDeFgHiJkLmNoPqRsT" },
    { key: "zYxWvUtSrQpOnMlKjIhG", label: "users/zYxWvUtSrQpOnMlKjIhG" },
  ],
};
