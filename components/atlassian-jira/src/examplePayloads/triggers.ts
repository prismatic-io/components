import type { TriggerPayload } from "@prismatic-io/spectral";













export const webhookEventsExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "X-Atlassian-Webhook-Identifier": "8c1d3a36-9c7d-4f6e-9b50-3e8c4d9b1a2f",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        timestamp: 1747749600000,
        webhookEvent: "jira:issue_created",
        issue_event_type_name: "issue_created",
        user: {
          self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
          accountId: "5b10a2844c20165700ede21g",
          accountType: "atlassian",
          displayName: "John Smith",
          active: true,
          timeZone: "America/Chicago",
        },
        issue: {
          id: "10500",
          self: "https://your-domain.atlassian.net/rest/api/3/issue/10500",
          key: "PROJ-501",
          fields: {
            summary: "Fix login button on mobile",
            issuetype: {
              self: "https://your-domain.atlassian.net/rest/api/3/issuetype/10004",
              id: "10004",
              name: "Bug",
              subtask: false,
            },
            status: {
              self: "https://your-domain.atlassian.net/rest/api/3/status/10000",
              name: "To Do",
              id: "10000",
              statusCategory: {
                self: "https://your-domain.atlassian.net/rest/api/3/statuscategory/2",
                id: 2,
                key: "new",
                name: "To Do",
              },
            },
            project: {
              self: "https://your-domain.atlassian.net/rest/api/3/project/10000",
              id: "10000",
              key: "PROJ",
              name: "Project Alpha",
              projectTypeKey: "software",
            },
            priority: {
              self: "https://your-domain.atlassian.net/rest/api/3/priority/2",
              name: "High",
              id: "2",
            },
            assignee: {
              self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10ac8d82e05b22cc7d4ef5",
              accountId: "5b10ac8d82e05b22cc7d4ef5",
              displayName: "Jane Doe",
              active: true,
            },
            reporter: {
              self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
              accountId: "5b10a2844c20165700ede21g",
              displayName: "John Smith",
              active: true,
            },
            created: "2026-05-20T14:20:00.000+0000",
            updated: "2026-05-20T14:20:00.000+0000",
          },
        },
        changelog: {
          id: "10010",
          items: [
            {
              field: "status",
              fieldtype: "jira",
              fieldId: "status",
              from: null,
              fromString: null,
              to: "10000",
              toString: "To Do",
            },
          ],
        },
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Issue Events": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Issue Events": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
};








export const pollChangesExamplePayload = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        created: [
          {
            id: "10500",
            key: "PROJ-501",
            self: "https://your-domain.atlassian.net/rest/api/3/issue/10500",
            fields: {
              summary: "Fix login button on mobile",
              status: { name: "To Do", id: "10000" },
              issuetype: { name: "Bug", id: "10004" },
              project: { key: "PROJ", name: "Project Alpha", id: "10000" },
              priority: { name: "High", id: "2" },
              created: "2026-05-20T14:20:00.000+0000",
              updated: "2026-05-20T14:20:00.000+0000",
            },
          },
        ],
        updated: [
          {
            id: "10342",
            key: "PROJ-342",
            self: "https://your-domain.atlassian.net/rest/api/3/issue/10342",
            fields: {
              summary: "Add OAuth support to API",
              status: { name: "In Progress", id: "3" },
              issuetype: { name: "Story", id: "10003" },
              project: { key: "PROJ", name: "Project Alpha", id: "10000" },
              priority: { name: "Medium", id: "3" },
              created: "2026-05-12T09:00:00.000+0000",
              updated: "2026-05-20T13:15:00.000+0000",
            },
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "New and Updated Issues": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "New and Updated Issues": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
  polledNoChanges: false as boolean | undefined,
};
