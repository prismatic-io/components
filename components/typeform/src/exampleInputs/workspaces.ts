export const updateWorkspaceInput = [
  {
    op: "replace",
    path: "/name",
    value: "marketing workspace",
  },
  {
    op: "add",
    path: "/members",
    value: {
      email: "test@test.com",
      role: "owner",
    },
  },
  {
    op: "remove",
    path: "/members",
    value: {
      email: "test@test.com",
    },
  },
];
