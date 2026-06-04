
export const getProjectExamplePayload = {
  data: {
    expand: "description,lead,url,projectKeys",
    self: "https://your-domain.atlassian.net/rest/api/3/project/EX",
    id: "10000",
    key: "EX",
    name: "Example Project",
    projectTypeKey: "software",
    simplified: false,
    style: "next-gen",
    isPrivate: false,
    lead: {
      self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
      accountId: "5b10a2844c20165700ede21g",
      displayName: "John Smith",
      active: true,
    },
    components: [],
    versions: [],
    roles: {
      Developers: "https://your-domain.atlassian.net/rest/api/3/project/EX/role/10001",
      Users: "https://your-domain.atlassian.net/rest/api/3/project/EX/role/10002",
    },
  },
};

export const listProjectsExamplePayload = {
  data: {
    self: "https://your-domain.atlassian.net/rest/api/3/project/search",
    nextPage: "https://your-domain.atlassian.net/rest/api/3/project/search?startAt=2",
    maxResults: 2,
    startAt: 0,
    total: 7,
    isLast: false,
    values: [
      {
        expand: "description,lead,url,projectKeys",
        self: "https://your-domain.atlassian.net/rest/api/3/project/EX",
        id: "10000",
        key: "EX",
        name: "Example Project",
        projectTypeKey: "software",
        simplified: false,
        style: "next-gen",
      },
      {
        expand: "description,lead,url,projectKeys",
        self: "https://your-domain.atlassian.net/rest/api/3/project/ABC",
        id: "10001",
        key: "ABC",
        name: "Another Project",
        projectTypeKey: "business",
        simplified: true,
        style: "classic",
      },
    ],
  },
};

export const findProjectExamplePayload = {
  data: [
    {
      expand: "description,lead,url,projectKeys",
      self: "https://your-domain.atlassian.net/rest/api/3/project/EX",
      id: "10000",
      key: "EX",
      name: "Example Project",
      projectTypeKey: "software",
      simplified: false,
      style: "next-gen",
    },
  ],
};

export const searchProjectsExamplePayload = {
  data: [
    {
      expand: "description,lead,url,projectKeys",
      self: "https://your-domain.atlassian.net/rest/api/3/project/EX",
      id: "10000",
      key: "EX",
      name: "Example Project",
      projectTypeKey: "software",
      simplified: false,
      style: "next-gen",
    },
    {
      expand: "description,lead,url,projectKeys",
      self: "https://your-domain.atlassian.net/rest/api/3/project/DEMO",
      id: "10001",
      key: "DEMO",
      name: "Demo Project",
      projectTypeKey: "business",
      simplified: true,
      style: "classic",
    },
  ],
};
