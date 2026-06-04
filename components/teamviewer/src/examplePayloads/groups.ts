



export const getGroupExamplePayload = {
  data: {
    id: "string",
    name: "string",
    shared_with: [
      {
        userid: "string",
        name: "string",
        alias: "string",
        permissions: "string",
        pending: true,
      },
    ],
    owner: {
      userid: "string",
      name: "string",
      alias: "string",
    },
    permissions: "string",
    policy_id: "string",
  },
};

export const createGroupExamplePayload = getGroupExamplePayload;

export const listGroupsExamplePayload = {
  data: {
    groups: [getGroupExamplePayload.data],
  },
};
