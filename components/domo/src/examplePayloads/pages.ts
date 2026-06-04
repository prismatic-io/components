













export const getPageExamplePayload = {
  data: {
    id: 1102458,
    name: "Sales Performance Dashboard",
    parentId: 0,
    ownerId: 87264918,
    locked: false,
    collectionIds: [],
    cardIds: [88012, 88013, 88014],
    visibility: {
      userIds: [87264918, 54320910],
      groupIds: [400112],
    },
    userIds: [87264918, 54320910],
    groupIds: [400112],
  },
};

export const listPagesExamplePayload = {
  data: [
    getPageExamplePayload.data,
    {
      id: 1102501,
      name: "Executive Overview",
      parentId: 0,
      ownerId: 87264918,
      locked: true,
      collectionIds: [],
      cardIds: [88100, 88101],
      visibility: {
        userIds: [],
        groupIds: [400205],
      },
      userIds: [],
      groupIds: [400205],
    },
  ],
};

export const createPageExamplePayload = getPageExamplePayload;

export const updatePageExamplePayload = {
  data: {
    ...getPageExamplePayload.data,
    name: "Sales Performance Dashboard (Updated)",
    locked: true,
  },
};

export const deletePageExamplePayload = { data: null };
