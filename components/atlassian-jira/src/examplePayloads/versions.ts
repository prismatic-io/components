export const listVersionsExamplePayload = {
  data: {
    self: "https://your-domain.atlassian.net/rest/api/3/project/PR/version?startAt=0&maxResults=2",
    nextPage:
      "https://your-domain.atlassian.net/rest/api/3/project/PR/version?startAt=2&maxResults=2",
    maxResults: 2,
    startAt: 0,
    total: 7,
    isLast: false,
    values: [
      {
        self: "https://your-domain.atlassian.net/rest/api/3/version/10000",
        id: "10000",
        description: "An excellent version",
        name: "New Version 1",
        archived: false,
        released: true,
        releaseDate: "2010-07-06",
        overdue: true,
        userReleaseDate: "6/Jul/2010",
        projectId: 10000,
      },
      {
        self: "https://your-domain.atlassian.net/rest/api/3/version/10010",
        id: "10010",
        description: "Minor Bugfix version",
        name: "Next Version",
        archived: false,
        released: false,
        overdue: false,
        projectId: 10000,
        issuesStatusForFixVersion: {
          unmapped: 0,
          toDo: 10,
          inProgress: 20,
          done: 100,
        },
      },
    ],
  },
};

export const createVersionExamplePayload = {
  data: {
    self: "https://your-domain.atlassian.net/rest/api/3/version/10000",
    id: "10000",
    description: "An excellent version",
    name: "New Version 1",
    archived: false,
    released: true,
    releaseDate: "2010-07-06",
    userReleaseDate: "6/Jul/2010",
    project: "PXA",
    projectId: 10000,
  },
};

export const updateVersionExamplePayload = {
  data: {
    self: "https://your-domain.atlassian.net/rest/api/3/version/10000",
    id: "10000",
    description: "An excellent version",
    name: "New Version 1",
    archived: false,
    released: true,
    releaseDate: "2010-07-06",
    userReleaseDate: "6/Jul/2010",
    project: "PXA",
    projectId: 10000,
  },
};

export const getVersionExamplePayload = {
  data: {
    self: "https://your-domain.atlassian.net/rest/api/3/version/10000",
    id: "10000",
    description: "An excellent version",
    name: "Version 1.0",
    archived: false,
    released: true,
    releaseDate: "2024-01-15",
    overdue: false,
    userReleaseDate: "15/Jan/2024",
    projectId: 10000,
    project: "PROJ",
  },
};
