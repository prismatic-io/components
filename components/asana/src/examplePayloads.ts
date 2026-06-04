import type { TriggerPayload } from "@prismatic-io/spectral";













export const webhookExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "X-Hook-Signature":
        "1d6207f8818f063890758a32d3833914754ba788cb2993b04ac8eb064fef0fcd",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        events: [
          {
            action: "changed",
            change: {
              action: "changed",
              field: "name",
              new_value: {
                gid: "1202178854270531",
                resource_type: "task",
              },
            },
            created_at: "2026-05-20T14:00:00.000Z",
            parent: null,
            resource: {
              gid: "1202178854270531",
              resource_type: "task",
              name: "Learn how Asana works",
            },
            type: "task",
            user: {
              gid: "1202178852626547",
              resource_type: "user",
              name: "Example User",
            },
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Webhook Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Webhook Flow": ["example-api-key"],
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
  branch: "Notification",
};









export const workspaceProjectsTriggerExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "X-Hook-Signature":
        "1d6207f8818f063890758a32d3833914754ba788cb2993b04ac8eb064fef0fcd",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        events: [
          {
            action: "added",
            created_at: "2026-05-20T14:00:00.000Z",
            parent: null,
            resource: {
              gid: "1202461773653662",
              resource_type: "project",
              name: "My new project name",
            },
            type: "project",
            user: {
              gid: "1202178852626547",
              resource_type: "user",
              name: "Example User",
            },
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Workspace Projects Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Workspace Projects Flow": ["example-api-key"],
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
  branch: "Notification",
};









export const projectTasksTriggerExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "X-Hook-Signature":
        "1d6207f8818f063890758a32d3833914754ba788cb2993b04ac8eb064fef0fcd",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        events: [
          {
            action: "added",
            created_at: "2026-05-20T14:00:00.000Z",
            parent: {
              gid: "1202178854270532",
              resource_type: "project",
              name: "My new project name",
            },
            resource: {
              gid: "1202178854270531",
              resource_type: "task",
              name: "Learn how Asana works",
            },
            type: "task",
            user: {
              gid: "1202178852626547",
              resource_type: "user",
              name: "Example User",
            },
            task: {
              gid: "1202178854270531",
              assignee: {
                gid: "1202178852626547",
                resource_type: "user",
              },
              assignee_status: "today",
              completed: false,
              completed_at: null,
              created_at: "2026-05-20T14:00:00.000Z",
              due_at: null,
              due_on: "2026-05-27",
              followers: [{ gid: "1202178852626547", resource_type: "user" }],
              html_notes: "<body>Example task notes</body>",
              is_rendered_as_separator: false,
              liked: false,
              likes: [],
              memberships: [{}],
              modified_at: "2026-05-20T14:00:00.000Z",
              name: "Learn how Asana works",
              notes: "Example task notes",
              num_likes: 0,
              num_subtasks: 0,
              parent: null,
              projects: [{ gid: "1202178854270532", resource_type: "project" }],
              resource_type: "task",
              start_on: null,
              tags: [],
              resource_subtype: "default_task",
              workspace: {
                gid: "1126509132283071",
                resource_type: "workspace",
              },
            },
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Project Tasks Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Project Tasks Flow": ["example-api-key"],
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
  branch: "Notification",
};









export const storiesTriggerExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "X-Hook-Signature":
        "1d6207f8818f063890758a32d3833914754ba788cb2993b04ac8eb064fef0fcd",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        events: [
          {
            action: "added",
            created_at: "2026-05-20T14:00:00.000Z",
            parent: {
              gid: "1202178854270531",
              resource_type: "task",
              name: "Learn how Asana works",
            },
            resource: {
              gid: "1202461248558215",
              resource_type: "story",
              name: "commented",
            },
            type: "story",
            user: {
              gid: "1202178852626547",
              resource_type: "user",
              name: "Example User",
            },
            story: {
              gid: "1202461248558215",
              created_at: "2026-05-20T14:00:00.000Z",
              created_by: {
                gid: "1202178852626547",
                resource_type: "user",
              },
              resource_subtype: "comment_added",
              resource_type: "story",
              text: "This is an example comment on the task.",
              type: "comment",
            },
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Stories Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Stories Flow": ["example-api-key"],
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
  branch: "Notification",
};








export const pollChangesTriggerExamplePayload = {
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
            gid: "1202178854270531",
            assignee: { gid: "1202178852626547", resource_type: "user" },
            assignee_status: "today",
            completed: false,
            completed_at: null,
            created_at: "2026-05-20T14:00:00.000Z",
            due_at: null,
            due_on: "2026-05-27",
            followers: [{ gid: "1202178852626547", resource_type: "user" }],
            html_notes: "<body>Newly created task notes</body>",
            is_rendered_as_separator: false,
            liked: false,
            likes: [],
            memberships: [{}],
            modified_at: "2026-05-20T14:00:00.000Z",
            name: "Newly created task",
            notes: "Newly created task notes",
            num_likes: 0,
            num_subtasks: 0,
            parent: null,
            projects: [{ gid: "1202178854270532", resource_type: "project" }],
            resource_type: "task",
            start_on: null,
            tags: [],
            resource_subtype: "default_task",
            workspace: { gid: "1126509132283071", resource_type: "workspace" },
          },
        ],
        updated: [
          {
            gid: "1202178854270599",
            assignee: { gid: "1202178852626547", resource_type: "user" },
            assignee_status: "later",
            completed: false,
            completed_at: null,
            created_at: "2026-05-19T10:00:00.000Z",
            due_at: null,
            due_on: "2026-05-30",
            followers: [{ gid: "1202178852626547", resource_type: "user" }],
            html_notes: "<body>Recently updated task notes</body>",
            is_rendered_as_separator: false,
            liked: false,
            likes: [],
            memberships: [{}],
            modified_at: "2026-05-20T15:00:00.000Z",
            name: "Recently updated task",
            notes: "Recently updated task notes",
            num_likes: 0,
            num_subtasks: 0,
            parent: null,
            projects: [{ gid: "1202178854270532", resource_type: "project" }],
            resource_type: "task",
            start_on: null,
            tags: [],
            resource_subtype: "default_task",
            workspace: { gid: "1126509132283071", resource_type: "workspace" },
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Polling Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Polling Flow": ["example-api-key"],
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
  polledNoChanges: false,
};
