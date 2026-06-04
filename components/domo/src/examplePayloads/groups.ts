
















export const getGroupExamplePayload = {
  data: {
    id: 400112,
    name: "Analytics Team",
    isActive: true,
    creatorId: 87264918,
    default: false,
    userCount: 8,
    memberCount: 8,
  },
};

export const listGroupsExamplePayload = {
  data: [
    getGroupExamplePayload.data,
    {
      id: 400205,
      name: "Executive Dashboard Viewers",
      isActive: true,
      creatorId: 87264918,
      default: false,
      userCount: 12,
      memberCount: 12,
    },
  ],
};

export const createGroupExamplePayload = getGroupExamplePayload;

export const updateGroupExamplePayload = {
  data: {
    ...getGroupExamplePayload.data,
    name: "Analytics Team (Updated)",
  },
};

export const deleteGroupExamplePayload = { data: null };

export const listUsersInGroupExamplePayload = {
  data: [87264918, 54320910, 66011234, 72980045],
};

export const addUserToGroupExamplePayload = { data: null };

export const removeUserFromGroupExamplePayload = { data: null };
