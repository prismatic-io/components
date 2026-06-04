import type { TriggerPayload } from "@prismatic-io/spectral";













export const webhookExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "X-Signature": "1d6207f8818f063890758a32d3833914754ba788cb2993b04ac8eb064fef0fcd",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        event: "taskCreated",
        webhook_id: "4b67ac88-e506-4a29-9d42-26e504e3435e",
        task_id: "9hx",
        history_items: [
          {
            id: "8a2f82db-7718-4fdb-9493-4849e67f009d",
            type: 1,
            date: "1704153600000",
            field: "status",
            parent_id: "124",
            data: {
              status_type: "open",
            },
            source: null,
            user: {
              id: 81942673,
              username: "John Doe",
              email: "john.doe@example.com",
              color: "#7b68ee",
              initials: "JD",
              profilePicture: null,
            },
            before: null,
            after: {
              status: "to do",
              color: "#d3d3d3",
              orderindex: 0,
              type: "open",
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
};





const newTaskRecord = {
  id: "9hy",
  custom_id: null,
  name: "Implement Login Flow",
  text_content: "Implement the login flow including OAuth2 redirect handling.",
  description: "Implement the login flow including OAuth2 redirect handling.",
  status: {
    status: "to do",
    color: "#d3d3d3",
    type: "open",
    orderindex: 0,
  },
  orderindex: "2.00000000000000000000000000000000",
  date_created: "1704153600000",
  date_updated: "1704153600000",
  date_closed: null,
  date_done: null,
  archived: false,
  creator: {
    id: 81942673,
    username: "John Doe",
    color: "#7b68ee",
    email: "john.doe@example.com",
    profilePicture: "https://attachments.clickup.com/profilePictures/81942673_abc.jpg",
  },
  assignees: [],
  watchers: [],
  checklists: [],
  tags: [],
  parent: null,
  priority: null,
  due_date: null,
  start_date: null,
  points: null,
  time_estimate: null,
  time_spent: 0,
  custom_fields: [],
  dependencies: [],
  linked_tasks: [],
  team_id: "9012345",
  url: "https://app.clickup.com/t/9hy",
  permission_level: "create",
  list: {
    id: "124",
    name: "Sprint Backlog",
    access: true,
  },
  project: {
    id: "456",
    name: "Website Redesign",
    hidden: false,
    access: true,
  },
  folder: {
    id: "456",
    name: "Website Redesign",
    hidden: false,
    access: true,
  },
  space: {
    id: "789",
  },
};

const updatedTaskRecord = {
  id: "9hx",
  custom_id: null,
  name: "Design Homepage",
  text_content: "Design the new homepage with a modern and clean look.",
  description: "Design the new homepage for the website.",
  status: {
    status: "in progress",
    color: "#4194f6",
    type: "custom",
    orderindex: 1,
  },
  orderindex: "1.00000000000000000000000000000000",
  date_created: "1704067200000",
  date_updated: "1704157200000",
  date_closed: null,
  date_done: null,
  archived: false,
  creator: {
    id: 81942673,
    username: "John Doe",
    color: "#7b68ee",
    email: "john.doe@example.com",
    profilePicture: "https://attachments.clickup.com/profilePictures/81942673_abc.jpg",
  },
  assignees: [
    {
      id: 81942673,
      username: "John Doe",
      color: "#7b68ee",
      email: "john.doe@example.com",
      initials: "JD",
      profilePicture: null,
    },
  ],
  watchers: [],
  checklists: [],
  tags: [
    {
      name: "design",
      tag_bg: "#1e90ff",
      tag_fg: "#ffffff",
      creator: 81942673,
    },
  ],
  parent: null,
  priority: {
    id: "2",
    priority: "high",
    color: "#ffcc00",
    orderindex: "2",
  },
  due_date: "1706745600000",
  start_date: "1704067200000",
  points: null,
  time_estimate: 28800000,
  time_spent: 3600000,
  custom_fields: [],
  dependencies: [],
  linked_tasks: [],
  team_id: "9012345",
  url: "https://app.clickup.com/t/9hx",
  permission_level: "create",
  list: {
    id: "124",
    name: "Sprint Backlog",
    access: true,
  },
  project: {
    id: "456",
    name: "Website Redesign",
    hidden: false,
    access: true,
  },
  folder: {
    id: "456",
    name: "Website Redesign",
    hidden: false,
    access: true,
  },
  space: {
    id: "789",
  },
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
        created: [newTaskRecord],
        updated: [updatedTaskRecord],
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
