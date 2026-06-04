
export const getIssueExamplePayload = {
  data: {
    fields: {
      watcher: {
        isWatching: true,
        self: "https://your-domain.atlassian.net/rest/api/2/issue/PROJ-123/watchers",
        watchCount: 5,
      },
      attachment: [
        {
          author: {
            accountId: "5b10ac8d82e05b22cc7d4ef5",
            accountType: "atlassian",
            active: true,
            avatarUrls: {
              "16x16":
                "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10ac8d82e05b22cc7d4ef5/16x16.png",
              "24x24":
                "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10ac8d82e05b22cc7d4ef5/24x24.png",
              "32x32":
                "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10ac8d82e05b22cc7d4ef5/32x32.png",
              "48x48":
                "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10ac8d82e05b22cc7d4ef5/48x48.png",
            },
            displayName: "John Doe",
            key: "jdoe",
            name: "jdoe",
            self: "https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10ac8d82e05b22cc7d4ef5",
          },
          content: "https://your-domain.atlassian.net/secure/attachment/12345/document.pdf",
          created: "2023-08-29T10:30:00.000+0000",
          filename: "document.pdf",
          id: 12345,
          mimeType: "application/pdf",
          self: "https://your-domain.atlassian.net/rest/api/2/attachment/12345",
          size: 1024000,
          thumbnail: "https://your-domain.atlassian.net/secure/thumbnail/12345",
        },
      ],
      "sub-tasks": [
        {
          id: "10001",
          outwardIssue: {
            fields: {
              status: {
                iconUrl: "https://your-domain.atlassian.net/images/icons/statuses/open.png",
                name: "Open",
              },
            },
            id: "10002",
            key: "PROJ-124",
            self: "https://your-domain.atlassian.net/rest/api/2/issue/10002",
          },
          type: {
            id: "10003",
            inward: "subtask of",
            name: "Subtask",
            outward: "parent task of",
          },
        },
      ],
      description: {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "This is a sample issue description.",
              },
            ],
          },
        ],
      },
      project: {
        avatarUrls: {
          "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
          "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
          "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
          "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000",
        },
        id: "10000",
        insight: {
          lastIssueUpdateTime: "2023-08-29T14:30:00.000+0000",
          totalIssueCount: 150,
        },
        key: "PROJ",
        name: "Sample Project",
        projectCategory: {
          description: "Projects for development team",
          id: "10001",
          name: "Development",
          self: "https://your-domain.atlassian.net/rest/api/2/projectCategory/10001",
        },
        self: "https://your-domain.atlassian.net/rest/api/2/project/10000",
        simplified: false,
        style: "classic",
      },
      comment: [
        {
          author: {
            accountId: "5b10ac8d82e05b22cc7d4ef5",
            active: true,
            displayName: "John Doe",
            self: "https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10ac8d82e05b22cc7d4ef5",
          },
          body: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "This is a comment on the issue.",
                  },
                ],
              },
            ],
          },
          created: "2023-08-29T11:00:00.000+0000",
          id: "10050",
          self: "https://your-domain.atlassian.net/rest/api/2/issue/PROJ-123/comment/10050",
          updateAuthor: {
            accountId: "5b10ac8d82e05b22cc7d4ef5",
            active: true,
            displayName: "John Doe",
            self: "https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10ac8d82e05b22cc7d4ef5",
          },
          updated: "2023-08-29T11:00:00.000+0000",
          visibility: {
            identifier: "developers",
            type: "group",
            value: "developers",
          },
        },
      ],
      issuelinks: [
        {
          id: "10060",
          inwardIssue: {
            fields: {
              status: {
                iconUrl: "https://your-domain.atlassian.net/images/icons/statuses/inprogress.png",
                name: "In Progress",
              },
            },
            id: "10070",
            key: "PROJ-125",
            self: "https://your-domain.atlassian.net/rest/api/2/issue/10070",
          },
          type: {
            id: "10000",
            inward: "is blocked by",
            name: "Blocks",
            outward: "blocks",
          },
        },
      ],
      worklog: [
        {
          author: {
            accountId: "5b10ac8d82e05b22cc7d4ef5",
            active: true,
            displayName: "John Doe",
            self: "https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10ac8d82e05b22cc7d4ef5",
          },
          comment: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Worked on implementing the feature.",
                  },
                ],
              },
            ],
          },
          id: "10080",
          issueId: "10000",
          self: "https://your-domain.atlassian.net/rest/api/2/issue/PROJ-123/worklog/10080",
          started: "2023-08-29T09:00:00.000+0000",
          timeSpent: "2h",
          timeSpentSeconds: 7200,
          updateAuthor: {
            accountId: "5b10ac8d82e05b22cc7d4ef5",
            active: true,
            displayName: "John Doe",
            self: "https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10ac8d82e05b22cc7d4ef5",
          },
          updated: "2023-08-29T09:00:00.000+0000",
          visibility: {
            identifier: "developers",
            type: "group",
            value: "developers",
          },
        },
      ],
      updated: 1693312200000,
      timetracking: {
        originalEstimate: "1w 2d",
        originalEstimateSeconds: 777600,
        remainingEstimate: "5d",
        remainingEstimateSeconds: 432000,
        timeSpent: "2d",
        timeSpentSeconds: 172800,
      },
    },
    id: "10000",
    key: "PROJ-123",
    self: "https://your-domain.atlassian.net/rest/api/2/issue/10000",
  },
};

export const createIssueExamplePayload = {
  data: {
    id: "10001",
    key: "HSP-25",
    self: "https://your-domain.atlassian.net/rest/api/3/issue/10001",
  },
};

export const updateIssueExamplePayload = {
  data: {
    id: "10001",
    key: "HSP-25",
    self: "https://your-domain.atlassian.net/rest/api/3/issue/10001",
  },
};

export const searchIssuesExamplePayload = {
  data: {
    expand: "names,schema",
    startAt: 0,
    maxResults: 50,
    total: 1,
    issues: [
      {
        expand: "",
        id: "10001",
        self: "https://your-domain.atlassian.net/rest/api/3/issue/10001",
        key: "HSP-1",
        fields: {
          summary: "Bug in authorization process",
          issueType: {
            name: "Bug",
            id: "1",
          },
          project: {
            key: "HSP",
            name: "Example Project",
            id: "10000",
          },
          status: {
            name: "Open",
            id: "1",
          },
          priority: {
            name: "Medium",
            id: "3",
          },
          assignee: {
            displayName: "John Smith",
            accountId: "5b10a2844c20165700ede21g",
          },
        },
      },
    ],
  },
};

export const listIssuesExamplePayload = {
  data: {
    expand: "names,schema",
    startAt: 0,
    maxResults: 50,
    total: 3,
    issues: [
      {
        id: "10001",
        key: "HSP-1",
        fields: {
          summary: "Bug in authorization process",
          status: { name: "Open" },
          priority: { name: "Medium" },
        },
      },
      {
        id: "10002",
        key: "HSP-2",
        fields: {
          summary: "Feature request for dashboard",
          status: { name: "In Progress" },
          priority: { name: "High" },
        },
      },
      {
        id: "10003",
        key: "HSP-3",
        fields: {
          summary: "Documentation update needed",
          status: { name: "To Do" },
          priority: { name: "Low" },
        },
      },
    ],
  },
};

export const listIssueTransitionsExamplePayload = {
  data: {
    expand: "transitions",
    transitions: [
      {
        id: "21",
        name: "In Progress",
        to: {
          self: "https://your-domain.atlassian.net/rest/api/3/status/3",
          description: "This issue is being actively worked on at the moment by the assignee.",
          iconUrl: "https://your-domain.atlassian.net/images/icons/statuses/inprogress.png",
          name: "In Progress",
          id: "3",
        },
        hasScreen: false,
        isGlobal: true,
        isInitial: false,
        isConditional: false,
      },
      {
        id: "31",
        name: "Done",
        to: {
          self: "https://your-domain.atlassian.net/rest/api/3/status/10001",
          description: "Work has been completed on this issue.",
          name: "Done",
          id: "10001",
        },
        hasScreen: false,
        isGlobal: true,
        isInitial: false,
        isConditional: false,
      },
    ],
  },
};

export const deleteIssueExamplePayload = {
  data: {},
};

export const findIssueExamplePayload = {
  data: {
    expand: "names,schema",
    startAt: 0,
    maxResults: 50,
    total: 1,
    issues: [
      {
        expand: "",
        id: "10001",
        self: "https://your-domain.atlassian.net/rest/api/3/issue/10001",
        key: "PROJ-123",
        fields: {
          summary: "Found issue matching criteria",
          issueType: {
            name: "Task",
            id: "10001",
          },
          project: {
            key: "PROJ",
            name: "Project Name",
            id: "10000",
          },
          status: {
            name: "In Progress",
            id: "3",
          },
        },
      },
    ],
  },
};

export const transitionIssueExamplePayload = {
  data: {},
};

export const addIssueAttachmentExamplePayload = {
  data: [
    {
      self: "https://your-domain.atlassian.net/rest/api/2/attachment/10001",
      id: "10001",
      filename: "document.pdf",
      author: {
        self: "https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10ac8d82e05b22cc7d4ef5",
        accountId: "5b10ac8d82e05b22cc7d4ef5",
        displayName: "John Doe",
        active: true,
      },
      created: "2024-01-15T10:30:00.000+0000",
      size: 1024000,
      mimeType: "application/pdf",
      content: "https://your-domain.atlassian.net/secure/attachment/10001/document.pdf",
      thumbnail: "https://your-domain.atlassian.net/secure/thumbnail/10001",
    },
  ],
};

export const downloadAttachmentExamplePayload = {
  data: [
    {
      filename: "document.pdf",
      data: Buffer.from("base64-encoded-file-data"),
      contentType: "application/pdf",
    },
  ],
};

export const listIssueAttachmentsExamplePayload = {
  data: [
    {
      self: "https://your-domain.atlassian.net/rest/api/2/attachment/10001",
      id: "10001",
      filename: "screenshot.png",
      author: {
        self: "https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10ac8d82e05b22cc7d4ef5",
        accountId: "5b10ac8d82e05b22cc7d4ef5",
        displayName: "Jane Smith",
        active: true,
      },
      created: "2024-01-15T10:30:00.000+0000",
      size: 256000,
      mimeType: "image/png",
      content: "https://your-domain.atlassian.net/secure/attachment/10001/screenshot.png",
    },
    {
      self: "https://your-domain.atlassian.net/rest/api/2/attachment/10002",
      id: "10002",
      filename: "requirements.docx",
      author: {
        self: "https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10ac8d82e05b22cc7d4ef5",
        accountId: "5b10ac8d82e05b22cc7d4ef5",
        displayName: "Jane Smith",
        active: true,
      },
      created: "2024-01-16T14:20:00.000+0000",
      size: 512000,
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      content: "https://your-domain.atlassian.net/secure/attachment/10002/requirements.docx",
    },
  ],
};

export const listIssueWorklogsExamplePayload = {
  data: {
    startAt: 0,
    maxResults: 2,
    total: 2,
    worklogs: [
      {
        self: "https://your-domain.atlassian.net/rest/api/3/issue/10010/worklog/10000",
        author: {
          self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
          accountId: "5b10a2844c20165700ede21g",
          displayName: "John Doe",
          active: true,
        },
        updateAuthor: {
          self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
          accountId: "5b10a2844c20165700ede21g",
          displayName: "John Doe",
          active: true,
        },
        comment: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Worked on implementing new feature",
                },
              ],
            },
          ],
        },
        created: "2024-01-15T09:00:00.000+0000",
        updated: "2024-01-15T09:00:00.000+0000",
        started: "2024-01-15T08:00:00.000+0000",
        timeSpent: "3h",
        timeSpentSeconds: 10800,
        id: "10000",
        issueId: "10010",
      },
      {
        self: "https://your-domain.atlassian.net/rest/api/3/issue/10010/worklog/10001",
        author: {
          self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
          accountId: "5b10a2844c20165700ede21g",
          displayName: "John Doe",
          active: true,
        },
        updateAuthor: {
          self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
          accountId: "5b10a2844c20165700ede21g",
          displayName: "John Doe",
          active: true,
        },
        created: "2024-01-16T14:00:00.000+0000",
        updated: "2024-01-16T14:00:00.000+0000",
        started: "2024-01-16T13:00:00.000+0000",
        timeSpent: "2h 30m",
        timeSpentSeconds: 9000,
        id: "10001",
        issueId: "10010",
      },
    ],
  },
};
