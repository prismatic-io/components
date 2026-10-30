export const listBoardsSprintsExamplePayload = {
  data: {
    maxResults: 2,
    startAt: 1,
    total: 5,
    isLast: false,
    values: [
      {
        id: 37,
        self: "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
        state: "closed",
        name: "sprint 1",
        startDate: "2015-04-11T15:22:00.000+10:00",
        endDate: "2015-04-20T01:22:00.000+10:00",
        completeDate: "2015-04-20T11:04:00.000+10:00",
        originBoardId: 5,
        goal: "sprint 1 goal",
      },
      {
        id: 72,
        self: "https://your-domain.atlassian.net/rest/agile/1.0/sprint/73",
        state: "future",
        name: "sprint 2",
        goal: "sprint 2 goal",
      },
    ],
  },
};

export const listBoardsExamplePayload = {
  data: {
    maxResults: 2,
    startAt: 1,
    total: 5,
    isLast: false,
    values: [
      {
        id: 84,
        self: "https://your-domain.atlassian.net/rest/agile/1.0/board/84",
        name: "scrum board",
        type: "scrum",
      },
      {
        id: 92,
        self: "https://your-domain.atlassian.net/rest/agile/1.0/board/92",
        name: "kanban board",
        type: "kanban",
      },
    ],
  },
};

export const getBoardExamplePayload = {
  data: {
    id: 84,
    self: "https://your-domain.atlassian.net/rest/agile/1.0/board/84",
    name: "scrum board",
    type: "scrum",
    location: {
      projectId: 10040,
      userId: 10040,
      userAccountId: "5b10a2844c20165700ede21g",
      displayName: "Example Project",
      projectName: "Example Project",
      projectKey: "EX",
      projectTypeKey: "software",
      name: "Example Project",
    },
  },
};

export const selectBoardExamplePayload = {
  result: [
    { label: "scrum board", key: "84" },
    { label: "kanban board", key: "92" },
  ],
};

export const selectBoardVersionExamplePayload = {
  result: [
    { label: "Version 1.0", key: "10000" },
    { label: "Version 1.1", key: "10001" },
  ],
};
