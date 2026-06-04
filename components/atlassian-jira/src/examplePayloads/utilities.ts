export const listIssueFieldsExamplePayload = {
  data: [
    {
      id: "description",
      name: "Description",
      custom: false,
      orderable: true,
      navigable: true,
      searchable: true,
      clauseNames: ["description"],
      schema: {
        type: "string",
        system: "description",
      },
    },
    {
      id: "summary",
      key: "summary",
      name: "Summary",
      custom: false,
      orderable: true,
      navigable: true,
      searchable: true,
      clauseNames: ["summary"],
      schema: {
        type: "string",
        system: "summary",
      },
    },
  ],
};

export const listIssueCustomFieldsExamplePayload = {
  data: [
    {
      clauseNames: [],
      custom: true,
      id: "statuscategorychangedate",
      key: "statuscategorychangedate",
      name: "Status Category Changed",
      navigable: true,
      orderable: false,
      schema: {
        type: "datetime",
        system: "statuscategorychangedate",
      },
      searchable: true,
    },
  ],
};

export const queryV3ExamplePayload = {
  data: {
    expand: "names,schema",
    startAt: 0,
    maxResults: 50,
    total: 2,
    issues: [
      {
        expand: "",
        id: "10001",
        self: "https://your-domain.atlassian.net/rest/api/3/issue/10001",
        key: "PROJ-1",
        fields: {
          summary: "First matching issue",
          status: {
            name: "To Do",
            id: "1",
          },
        },
      },
      {
        expand: "",
        id: "10002",
        self: "https://your-domain.atlassian.net/rest/api/3/issue/10002",
        key: "PROJ-2",
        fields: {
          summary: "Second matching issue",
          status: {
            name: "In Progress",
            id: "3",
          },
        },
      },
    ],
  },
};

export const getStatusListExamplePayload = {
  data: {
    self: "https://your-domain.atlassian.net/rest/api/3/statuses/search",
    nextPage: "https://your-domain.atlassian.net/rest/api/3/statuses/search?startAt=2",
    maxResults: 2,
    startAt: 0,
    total: 5,
    isLast: false,
    values: [
      {
        id: "1",
        name: "To Do",
        statusCategory: "TODO",
        scope: {
          type: "PROJECT",
          project: {
            id: "10000",
          },
        },
      },
      {
        id: "3",
        name: "In Progress",
        statusCategory: "IN_PROGRESS",
        scope: {
          type: "PROJECT",
          project: {
            id: "10000",
          },
        },
      },
    ],
  },
};

export const listIssueLinkTypesExamplePayload = {
  data: {
    issueLinkTypes: [
      {
        id: "10000",
        name: "Blocks",
        inward: "is blocked by",
        outward: "blocks",
        self: "https://your-domain.atlassian.net/rest/api/3/issueLinkType/10000",
      },
      {
        id: "10001",
        name: "Cloners",
        inward: "is cloned by",
        outward: "clones",
        self: "https://your-domain.atlassian.net/rest/api/3/issueLinkType/10001",
      },
      {
        id: "10002",
        name: "Duplicate",
        inward: "is duplicated by",
        outward: "duplicates",
        self: "https://your-domain.atlassian.net/rest/api/3/issueLinkType/10002",
      },
    ],
  },
};

export const listIssueTypesExamplePayload = {
  data: [
    {
      self: "https://your-domain.atlassian.net/rest/api/3/issuetype/10000",
      id: "10000",
      description: "A task that needs to be done.",
      iconUrl: "https://your-domain.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10318",
      name: "Task",
      subtask: false,
      avatarId: 10318,
      hierarchyLevel: 0,
    },
    {
      self: "https://your-domain.atlassian.net/rest/api/3/issuetype/10001",
      id: "10001",
      description: "A problem that needs to be fixed.",
      iconUrl: "https://your-domain.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303",
      name: "Bug",
      subtask: false,
      avatarId: 10303,
      hierarchyLevel: 0,
    },
    {
      self: "https://your-domain.atlassian.net/rest/api/3/issuetype/10002",
      id: "10002",
      description: "A new feature that needs to be implemented.",
      iconUrl: "https://your-domain.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10310",
      name: "Story",
      subtask: false,
      avatarId: 10310,
      hierarchyLevel: 0,
    },
  ],
};

export const listPrioritiesExamplePayload = {
  data: {
    self: "https://your-domain.atlassian.net/rest/api/3/priority/search",
    nextPage: "https://your-domain.atlassian.net/rest/api/3/priority/search?startAt=3",
    maxResults: 3,
    startAt: 0,
    total: 5,
    isLast: false,
    values: [
      {
        self: "https://your-domain.atlassian.net/rest/api/3/priority/1",
        statusColor: "#d04437",
        description: "This problem will block progress.",
        iconUrl: "https://your-domain.atlassian.net/images/icons/priorities/highest.svg",
        name: "Highest",
        id: "1",
      },
      {
        self: "https://your-domain.atlassian.net/rest/api/3/priority/2",
        statusColor: "#ea7d24",
        description: "Serious problem that could block progress.",
        iconUrl: "https://your-domain.atlassian.net/images/icons/priorities/high.svg",
        name: "High",
        id: "2",
      },
      {
        self: "https://your-domain.atlassian.net/rest/api/3/priority/3",
        statusColor: "#59afe1",
        description: "Has the potential to affect progress.",
        iconUrl: "https://your-domain.atlassian.net/images/icons/priorities/medium.svg",
        name: "Medium",
        id: "3",
      },
    ],
  },
};
