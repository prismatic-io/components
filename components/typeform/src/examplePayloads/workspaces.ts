export const getWorkspaceResponse = {
  account_id: "ABCD1234",
  forms: [
    {
      count: 12,
      href: "https://api.typeform.com/workspaces/a1b2c3/forms",
    },
  ],
  id: "a1b2c3",
  name: "My Workspace",
  self: [
    {
      href: "https://api.typeform.com/workspaces/a1b2c3",
    },
  ],
  shared: false,
};

export const listWorkspacesResponse = {
  items: [getWorkspaceResponse],
};

export const listAccountWorkspacesResponse = {
  items: [
    {
      account_id: "ABCD1234",
      forms: [
        {
          count: 12,
          href: "https://api.typeform.com/workspaces/a1b2c3/forms",
        },
      ],
      id: "a1b2c3",
      name: "My Workspace",
      self: [
        {
          href: "https://api.typeform.com/workspaces/a1b2c3",
        },
      ],
      shared: false,
    },
  ],
  page_count: 1,
  total_items: 10,
};
