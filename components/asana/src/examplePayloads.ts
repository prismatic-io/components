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
export const createTaskExamplePayload = {
  data: {
    data: {
      gid: "1202461248558215",
      projects: [],
      memberships: [],
      resource_type: "task",
      created_at: "2022-06-16T20:30:21.641Z",
      modified_at: "2022-06-16T20:30:21.932Z",
      name: "My Task Name",
      is_rendered_as_separator: false,
      notes: "Here's my task notes!",
      assignee: { gid: "1202178852626547", resource_type: "user" },
      completed: false,
      assignee_status: "inbox",
      completed_at: null,
      due_on: null,
      due_at: null,
      resource_subtype: "default_task",
      start_on: null,
      tags: [],
      workspace: { gid: "1126509132283071", resource_type: "workspace" },
      liked: false,
      num_likes: 0,
      followers: [{ gid: "1202178852626547", resource_type: "user" }],
      html_notes: "<body>Here's my task notes!</body>",
      parent: null,
      likes: [],
    },
  },
};
export const updateTaskExamplePayload = {
  data: {
    data: {
      gid: "1202461395122529",
      projects: [],
      memberships: [],
      resource_type: "task",
      created_at: "2022-06-16T21:15:12.578Z",
      modified_at: "2022-06-16T21:15:14.361Z",
      name: "My new task name",
      is_rendered_as_separator: false,
      notes: "Here's my task notes!",
      assignee: { gid: "1202178852626547", resource_type: "user" },
      completed: false,
      assignee_status: "inbox",
      completed_at: null,
      due_on: null,
      due_at: null,
      resource_subtype: "default_task",
      start_on: null,
      tags: [],
      workspace: { gid: "1126509132283071", resource_type: "workspace" },
      num_likes: 0,
      html_notes: "<body>Here's my task notes!</body>",
      parent: null,
      liked: false,
      likes: [],
      followers: [],
    },
  },
};
export const getTaskExamplePayload = {
  data: {
    data: {
      gid: "75834703724",
      projects: "",
      resource_type: "task",
      name: "MyTask",
      notes: "These are my example task notes!",
      completed: false,
      resource_subtype: "default_task",
      tags: "",
      workspace: {
        gid: "867452364563",
        resource_type: "workspace",
        name: "Example Workspace",
      },
      custom_fields: {},
      assignee: {
        gid: "32493284234",
        name: "Example Assignee",
        resource_type: "user",
      },
      parent: null,
      assignee_status: "inbox",
      hearted: false,
    },
  },
};
export const listTasksExamplePayload = {
  data: {
    data: [
      {
        gid: "1202178854270531",
        assignee: { gid: "1202178852626547", resource_type: "user" },
        assignee_status: "today",
        completed: false,
        completed_at: null,
        created_at: "2022-04-25T19:28:54.408Z",
        due_at: null,
        due_on: "2022-05-02",
        followers: [{ gid: "1202178852626547", resource_type: "user" }],
        html_notes:
          '<body>We\'ve collected a set of guides, tips, and tutorials to help you learn about Asana. Check it out:<ul><li><a href="https://asana.com/guide">https://asana.com/guide</a></li></ul></body>',
        is_rendered_as_separator: false,
        liked: false,
        likes: [],
        memberships: [{}],
        modified_at: "2022-06-15T21:21:41.151Z",
        name: "Learn how Asana works",
        notes:
          "We've collected a set of guides, tips, and tutorials to help you learn about Asana. Check it out: https://asana.com/guide\n",
        num_likes: 0,
        num_subtasks: 0,
        parent: null,
        projects: [{ gid: "1202178854270532", resource_type: "project" }],
        resource_type: "task",
        start_on: null,
        tags: [
          { gid: "1202453664069905", resource_type: "tag" },
          { gid: "1202454369674628", resource_type: "tag" },
          { gid: "1202454863218026", resource_type: "tag" },
        ],
        resource_subtype: "default_task",
        workspace: { gid: "1126509132283071", resource_type: "workspace" },
      },
    ],
  },
};
export const deleteTaskExamplePayload = { data: { data: {} } };
export const addTagToTaskExamplePayload = { data: { data: {} } };
export const removeTagFromTaskExamplePayload = { data: { data: {} } };
export const addFollowersToTaskExamplePayload = {
  data: {
    data: {
      gid: "1202461451752271",
      resource_type: "task",
      created_at: "2022-06-16T21:17:30.519Z",
      name: "My task name",
      workspace: { gid: "1126509132283071", resource_type: "workspace" },
      followers: [{ gid: "1202178852626547", resource_type: "user" }],
    },
  },
};
export const removeFollowersFromTaskExamplePayload = {
  data: {
    data: {
      gid: "1202461530991735",
      resource_type: "task",
      created_at: "2022-06-16T21:33:52.572Z",
      name: "My new task name",
      workspace: { gid: "1126509132283071", resource_type: "workspace" },
      followers: [],
    },
  },
};
export const removeAssigneeFromTaskExamplePayload = { data: { data: {} } };
export const listSubtasksExamplePayload = {
  data: {
    data: [
      {
        gid: "1234567890123456",
        assignee: null,
        assignee_status: "upcoming",
        completed: false,
        completed_at: null,
        created_at: "2023-11-10T00:29:54.363Z",
        custom_fields: [],
        dependencies: [],
        dependents: [],
        due_at: null,
        due_on: null,
        followers: [
          {
            gid: "7890123456789012",
            resource_type: "user",
          },
        ],
        html_notes: "<body></body>",
        is_rendered_as_separator: false,
        liked: false,
        likes: [],
        memberships: [],
        modified_at: "2023-11-10T00:31:18.774Z",
        name: "Task",
        notes: "",
        num_likes: 0,
        num_subtasks: 2,
        parent: {
          gid: "2345678901234567",
          resource_type: "task",
        },
        projects: [],
        resource_type: "task",
        start_on: null,
        tags: [],
        resource_subtype: "default_task",
        workspace: {
          gid: "8901234567890123",
          resource_type: "workspace",
        },
      },
    ],
  },
};
export const createProjectsExamplePayload = {
  data: {
    data: {
      gid: "1202461772995112",
      resource_type: "project",
      created_at: "2022-06-16T22:53:48.986Z",
      modified_at: "2022-06-16T22:53:48.986Z",
      members: [{ gid: "1202178852626547", resource_type: "user" }],
      owner: { gid: "1202178852626547", resource_type: "user" },
      due_on: null,
      current_status: null,
      name: "My Cool Project",
      notes: "Some notes on my project",
      archived: false,
      workspace: { gid: "1126509132283071", resource_type: "workspace" },
      team: { gid: "1202178854270529", resource_type: "team" },
      start_on: null,
      color: "light-green",
      followers: [{ gid: "1202178852626547", resource_type: "user" }],
      html_notes: "<body>Some notes on my project</body>",
    },
  },
};
export const updateProjectExamplePayload = {
  data: {
    data: {
      gid: "1202461680419124",
      resource_type: "project",
      created_at: "2022-06-16T22:39:52.270Z",
      modified_at: "2022-06-16T22:39:54.373Z",
      due_date: null,
      due_on: null,
      current_status_update: null,
      current_status: null,
      name: "My new project name",
      notes: "My new project notes\n",
      archived: false,
      workspace: {
        gid: "1126509132283071",
        resource_type: "workspace",
        name: "Acme",
      },
      team: {
        gid: "1202178854270529",
        resource_type: "team",
        name: "Engineering",
      },
      permalink_url:
        "https://app.asana.com/0/1202461680419124/1202461680419124",
      is_template: false,
      default_view: "board",
      start_on: null,
      color: "light-green",
      icon: "board",
      completed: false,
      completed_at: null,
      completed_by: null,
      owner: {
        gid: "1202178852626547",
        resource_type: "user",
        name: "Example User",
      },
      members: [
        {
          gid: "1202178852626547",
          resource_type: "user",
          name: "Example User",
        },
      ],
      followers: [
        {
          gid: "1202178852626547",
          resource_type: "user",
          name: "Example User",
        },
      ],
    },
  },
};
export const getProjectExamplePayload = {
  data: {
    data: {
      gid: "1202461773653662",
      archived: false,
      color: "light-green",
      created_at: "2022-06-16T22:55:11.208Z",
      current_status: null,
      custom_fields: [],
      due_on: null,
      followers: [{ gid: "1202178852626547", resource_type: "user" }],
      html_notes: "<body>My new project notes</body>",
      members: [{ gid: "1202178852626547", resource_type: "user" }],
      modified_at: "2022-06-16T22:55:13.275Z",
      name: "My new project name",
      notes: "My new project notes",
      owner: { gid: "1202178852626547", resource_type: "user" },
      resource_type: "project",
      start_on: null,
      team: { gid: "1202178854270529", resource_type: "team" },
      workspace: { gid: "1126509132283071", resource_type: "workspace" },
    },
  },
};
export const listProjectsExamplePayload = {
  data: {
    data: [
      {
        gid: "1202178854270532",
        archived: false,
        color: "light-pink",
        created_at: "2022-04-25T19:28:55.557Z",
        current_status: null,
        custom_fields: [],
        due_on: "2022-05-25",
        followers: [{ gid: "1202178852626547", resource_type: "user" }],
        html_notes:
          "<body>Asana helps you plan your 1:1s in advance, stay focused during the conversation, and track notes and action items.</body>",
        members: [{ gid: "1202178852626547", resource_type: "user" }],
        modified_at: "2022-06-15T21:21:40.641Z",
        name: "[Sample] [Teammate] / Acme 1:1",
        notes:
          "Asana helps you plan your 1:1s in advance, stay focused during the conversation, and track notes and action items.",
        owner: { gid: "1202178852626547", resource_type: "user" },
        resource_type: "project",
        start_on: "2022-04-25",
        team: { gid: "1202178854270529", resource_type: "team" },
        workspace: { gid: "1126509132283071", resource_type: "workspace" },
      },
    ],
  },
};
export const deleteProjectsExamplePayload = { data: { data: {} } };
export const addUserToProjectExamplePayload = {
  data: {
    data: {
      gid: "1202461834400501",
      resource_type: "project",
      created_at: "2022-06-16T22:59:28.974Z",
      modified_at: "2022-06-16T22:59:31.222Z",
      members: [{ gid: "1202178852626547", resource_type: "user" }],
      owner: { gid: "1202178852626547", resource_type: "user" },
      due_on: null,
      current_status: null,
      name: "My new project name",
      notes: "My new project notes",
      html_notes: "<body>My new project notes</body>",
      archived: false,
      workspace: { gid: "1126509132283071", resource_type: "workspace" },
      team: { gid: "1202178854270529", resource_type: "team" },
      start_on: null,
      color: "light-green",
      followers: [{ gid: "1202178852626547", resource_type: "user" }],
    },
  },
};
export const addCustomFieldToProjectExamplePayload = {
  data: {
    data: {
      gid: "1202476446247138",
      resource_type: "custom_field_setting",
      custom_field: {
        gid: "1202476274909067",
        resource_type: "custom_field",
        created_by: {
          gid: "1202467472237333",
          resource_type: "user",
          name: "Example User",
        },
        resource_subtype: "multi_enum",
        type: "multi_enum",
        name: "Do you want these things?",
        enum_options: [
          {
            gid: "1202476274909068",
            resource_type: "enum_option",
            enabled: true,
            name: "My First Option",
            color: "green",
          },
          {
            gid: "1202476274909069",
            resource_type: "enum_option",
            enabled: true,
            name: "My Second Option",
            color: "red",
          },
          {
            gid: "1202476274909070",
            resource_type: "enum_option",
            enabled: true,
            name: "My Third Option",
            color: "orange",
          },
        ],
      },
      is_important: true,
      parent: {
        gid: "1202467472002605",
        resource_type: "project",
        name: "Brand redesign campaign",
      },
      project: {
        gid: "1202467472002605",
        resource_type: "project",
        name: "Brand redesign campaign",
      },
    },
  },
};
export const removeCustomFieldFromProjectExamplePayload = {
  data: { data: {} },
};
export const createSectionExamplePayload = {
  data: {
    data: {
      gid: "1202465892953048",
      resource_type: "section",
      created_at: "2022-06-17T15:53:48.455Z",
      name: "My Example Section",
      project: { gid: "1202178854270532", resource_type: "project" },
    },
  },
};
export const updateSectionExamplePayload = {
  data: {
    data: {
      gid: "1202178854270533",
      resource_type: "section",
      created_at: "2022-04-25T19:28:56.749Z",
      name: "My New Section Name",
      project: { gid: "1202178854270532", resource_type: "project" },
    },
  },
};
export const getSectionExamplePayload = {
  data: {
    data: {
      gid: "1202178854270533",
      created_at: "2022-04-25T19:28:56.749Z",
      name: "Discussion topics",
      project: {
        gid: "1202178854270532",
        name: "My Example Project",
        resource_type: "project",
      },
      resource_type: "section",
    },
  },
};
export const deleteSectionExamplePayload = { data: { data: {} } };
export const listSectionsExamplePayload = {
  data: {
    data: [
      {
        gid: "1202178854270533",
        created_at: "2022-04-25T19:28:56.749Z",
        name: "Discussion topics",
        project: { gid: "1202178854270532", resource_type: "project" },
        resource_type: "section",
      },
      {
        gid: "1202178854270541",
        created_at: "2022-04-25T19:28:59.950Z",
        name: "FYIs",
        project: { gid: "1202178854270532", resource_type: "project" },
        resource_type: "section",
      },
    ],
  },
};
export const addTaskToSectionExamplePayload = { data: { data: {} } };
export const createTagExamplePayload = {
  data: {
    data: {
      gid: "1202453507919841",
      resource_type: "tag",
      create_at: "2022-06-15T17:03:26.911Z",
      name: "My Example Tag",
      workspace: {
        gid: 1126509132283071,
        resource_type: "workspace",
      },
      color: "light-green",
      followers: [],
    },
  },
};
export const updateTagExamplePayload = {
  data: {
    data: {
      gid: "1202461644189657",
      resource_type: "tag",
      created_at: "2022-06-16T22:04:33.095Z",
      name: "My Updated Tag Name",
      notes: "My Updated Notes",
      workspace: { gid: "1126509132283071", resource_type: "workspace" },
      color: "dark-green",
      followers: [],
    },
  },
};
export const getTagExamplePayload = {
  data: {
    data: {
      gid: "1202461566347259",
      color: "light-green",
      created_at: "2022-06-16T21:44:38.673Z",
      followers: [],
      name: "My Example Tag",
      notes: "My Notes",
      resource_type: "tag",
      workspace: { gid: "1126509132283071", resource_type: "workspace" },
    },
  },
};
export const deleteTagExamplePayload = { data: { data: {} } };
export const listTagsExamplePayload = {
  data: {
    data: [
      {
        gid: "1202453507919841",
        color: "light-green",
        created_at: "2022-06-15T17:03:26.911Z",
        followers: [],
        name: "My example tag",
        resource_type: "tag",
        workspace: { gid: "1126509132283071", resource_type: "workspace" },
      },
    ],
  },
};
export const listTagsInTaskExamplePayload = {
  data: {
    data: [
      {
        gid: "1202453664069905",
        color: "light-green",
        created_at: "2022-06-15T17:32:21.828Z",
        followers: [],
        name: "My example tag",
        resource_type: "tag",
        workspace: { gid: "1126509132283071", resource_type: "workspace" },
      },
    ],
  },
};
export const findTagByNameExamplePayload = {
  data: {
    gid: "1202467057873527",
    color: "dark-green",
    created_at: "2022-06-17T20:28:26.601Z",
    name: "My Example Tag Name",
    resource_type: "tag",
  },
};
export const createTeamExamplePayload = {
  data: {
    data: {
      gid: "1202466032099844",
      resource_type: "team",
      name: "My New Team",
      permalink_url: "https://app.asana.com/0/1202466032099844",
      organization: {
        gid: "1126509132283071",
        resource_type: "workspace",
        name: "Acme",
      },
    },
  },
};
export const getTeamExamplePayload = {
  data: {
    data: {
      gid: "1126509132283073",
      name: "Example Team",
      organization: {
        gid: "1126509132283071",
        name: "Example Org",
        resource_type: "workspace",
      },
      permalink_url: "https://app.asana.com/0/1126509132283073",
      resource_type: "team",
    },
  },
};
export const listTeamsExamplePayload = {
  data: {
    data: [
      { gid: "1126509132283073", name: "Founders", resource_type: "team" },
      { gid: "1201132129713512", name: "Design", resource_type: "team" },
      { gid: "1201340876723312", name: "Engineering", resource_type: "team" },
    ],
  },
};
export const addUserToTeamExamplePayload = {
  data: {
    data: {
      gid: "1202178854270530",
      resource_type: "team_membership",
      team: {
        gid: "1202178854270529",
        resource_type: "team",
        name: "Engineering",
      },
      user: {
        gid: "1202178852626547",
        resource_type: "user",
        name: "Example User",
      },
      is_guest: false,
    },
  },
};
export const findTeamByNameExamplePayload = {
  data: {
    gid: "1126509132283071",
    name: "Example Team",
    resource_type: "team",
  },
};
export const getUsersExamplePayload = {
  data: {
    data: {
      gid: "1126508793140155",
      email: "user@example.com",
      name: "Example User",
      photo: {
        image_21x21:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_21x21.png",
        image_27x27:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_27x27.png",
        image_36x36:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_36x36.png",
        image_60x60:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_60x60.png",
        image_128x128:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_128x128.png",
      },
      resource_type: "user",
      workspaces: [
        {
          gid: "1126509132283071",
          name: "Example Workspace",
          resource_type: "workspace",
        },
      ],
    },
  },
};
export const getCurrentUserExamplePayload = {
  data: {
    data: {
      gid: "1126508793140155",
      email: "user@example.com",
      name: "Example User",
      photo: {
        image_21x21:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_21x21.png",
        image_27x27:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_27x27.png",
        image_36x36:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_36x36.png",
        image_60x60:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_60x60.png",
        image_128x128:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_128x128.png",
      },
      resource_type: "user",
      workspaces: [
        {
          gid: "1126509132283071",
          name: "Example Workspace",
          resource_type: "workspace",
        },
      ],
    },
  },
};
export const listUsersExamplePayload = {
  data: {
    data: [
      {
        gid: "1126508793140155",
        name: "Example User 1",
        resource_type: "user",
        email: "user-1@example.com",
        workspaces: [
          {
            gid: "1126509132283071",
            resource_type: "workspace",
          },
        ],
      },
      {
        gid: "1126508793140156",
        name: "Example User2 ",
        resource_type: "user",
        email: "user-2@example.com",
        workspaces: [
          {
            gid: "1126509132283071",
            resource_type: "workspace",
          },
        ],
      },
    ],
  },
};
export const listUsersInTeamExamplePayload = {
  data: [
    {
      gid: "54630745323",
      name: "Example User",
      resource_type: "user",
    },
    {
      gid: "54630745323",
      name: "Example User",
      resource_type: "user",
    },
    {
      gid: "54630745323",
      name: "Example User",
      resource_type: "user",
    },
  ],
};
export const findUserByNameOrEmailExamplePayload = {
  data: {
    gid: "1126508793140155",
    email: "user@example.com",
    name: "Example User",
    resource_type: "user",
    workspaces: [
      {
        gid: "1126509132283071",
        name: "Example Workspace",
        resource_type: "workspace",
      },
    ],
  },
};
export const getWorkspaceExamplePayload = {
  data: {
    data: {
      gid: "1126509132283071",
      email_domains: ["example.com"],
      is_organization: true,
      name: "Example Workspace",
      resource_type: "workspace",
    },
  },
};
export const listWorkspacesExamplePayload = {
  data: {
    data: [
      {
        gid: "1126509132283071",
        name: "Example Workspace 1",
        resource_type: "workspace",
      },
      {
        gid: "1126509132283072",
        name: "Example Workspace 2",
        resource_type: "workspace",
      },
    ],
  },
};
export const addUserExamplePayload = {
  data: {
    data: {
      gid: "1126508793140155",
      resource_type: "user",
      name: "Example User",
      email: "user@example.com",
      photo: {
        image_21x21:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_21x21.png",
        image_27x27:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_27x27.png",
        image_36x36:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_36x36.png",
        image_60x60:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_60x60.png",
        image_128x128:
          "https://s3.amazonaws.com/profile_photos/1126508793140155.1126509132283075.joZwntHYCrotR7QnI82A_128x128.png",
      },
    },
  },
};
export const findWorkspaceByNameExamplePayload = {
  data: {
    gid: "1126509132283071",
    name: "Example Workspace",
    resource_type: "workspace",
  },
};
export const portfolioExamplePayload = {
  data: {
    data: {
      gid: "12345",
      resource_type: "portfolio",
      color: "light-green",
      name: "Bug Portfolio",
      created_at: "2012-02-22T02:06:58.147Z",
      created_by: {
        gid: "12345",
        resource_type: "user",
        name: "Greg Sanchez",
      },
      current_status_update: {
        gid: "12345",
        resource_type: "status_update",
        resource_subtype: "project_status_update",
        title: "Status Update - Jun 15",
      },
      custom_field_settings: [
        {
          gid: "12345",
          resource_type: "custom_field_setting",
          custom_field: {
            gid: "12345",
            resource_type: "custom_field",
            created_by: {
              gid: "12345",
              resource_type: "user",
              name: "Greg Sanchez",
            },
            currency_code: "EUR",
            custom_label: "gold pieces",
            custom_label_position: "suffix",
            description: "Development team priority",
            display_value: "blue",
            enabled: true,
            enum_options: [
              {
                gid: "12345",
                resource_type: "enum_option",
                color: "blue",
                enabled: true,
                name: "Low",
              },
            ],
            enum_value: {
              gid: "12345",
              resource_type: "enum_option",
              color: "blue",
              enabled: true,
              name: "Low",
            },
            format: "custom",
            has_notifications_enabled: true,
            is_global_to_workspace: true,
            multi_enum_values: [
              {
                gid: "12345",
                resource_type: "enum_option",
                color: "blue",
                enabled: true,
                name: "Low",
              },
            ],
            name: "Status",
            number_value: 5.2,
            precision: 2,
            resource_subtype: "text",
            text_value: "Some Value",
            type: "text",
          },
          is_important: false,
          parent: {
            gid: "12345",
            resource_type: "project",
            name: "Stuff to buy",
          },
          project: {
            gid: "12345",
            resource_type: "project",
            name: "Stuff to buy",
          },
        },
      ],
      due_on: "2019-09-15",
      members: [
        {
          gid: "12345",
          resource_type: "user",
          name: "Greg Sanchez",
        },
      ],
      owner: {
        gid: "12345",
        resource_type: "user",
        name: "Greg Sanchez",
      },
      permalink_url: "https://app.asana.com/0/resource/123456789/list",
      public: false,
      start_on: "2019-09-14",
      workspace: {
        gid: "12345",
        resource_type: "workspace",
        name: "My Company Workspace",
      },
    },
  },
};
export const deletePortfolioExamplePayload = { data: { data: {} } };
export const listPortfoliosExamplePayload = {
  data: {
    data: [
      {
        gid: "12345",
        resource_type: "portfolio",
        name: "Example Portfolio",
      },
    ],
  },
};
export const addUserToPortfolioExamplePayload = {
  data: {
    data: {
      gid: "1202474374782519",
      resource_type: "portfolio",
      created_at: "2022-06-20T16:48:04.621Z",
      created_by: {
        gid: "1202467472237333",
        resource_type: "user",
        name: "Example User",
      },
      owner: {
        gid: "1202467472237333",
        resource_type: "user",
        name: "Example User",
      },
      name: "My Portfolio",
      public: true,
      members: [
        {
          gid: "1202467472237333",
          resource_type: "user",
          name: "Example User",
        },
        {
          gid: "1202467584678838",
          resource_type: "user",
          name: "Developer Name",
        },
      ],
      custom_field_settings: [],
      workspace: {
        gid: "1202467471973207",
        resource_type: "workspace",
        name: "Example Workspace",
      },
      permalink_url: "https://app.asana.com/0/portfolio/1202474374782519",
      color: "none",
      due_on: null,
      start_on: null,
      current_status_update: {
        gid: "1202475750145512",
        resource_type: "status_update",
        title: "This Portfolio of work is on track!",
      },
    },
  },
};
export const removeUserFromPortfolioExamplePayload = {
  data: {
    data: {
      gid: "1202476367473313",
      resource_type: "portfolio",
      created_at: "2022-06-20T18:18:47.435Z",
      created_by: { gid: "1202467472237333", resource_type: "user" },
      name: "Example Portfolio",
      members: [
        { gid: "1202467472237333", resource_type: "user" },
        { gid: "1202467584678838", resource_type: "user" },
      ],
      custom_field_settings: [],
      workspace: { gid: "1202467471973207", resource_type: "workspace" },
      color: "light-green",
    },
  },
};
export const addCustomFieldToPortfolioExamplePayload = {
  data: { data: {} },
};
export const removeCustomFieldFromPortfolioExamplePayload = {
  data: { data: {} },
};
export const listPortfolioItemsExamplePayload = {
  data: {
    data: [
      {
        gid: "12345",
        resource_type: "project",
        name: "Stuff to buy",
      },
    ],
  },
};
export const removePortfolioItemExamplePayload = { data: { data: {} } };
export const deleteWebhookExamplePayload = { data: {} };
export const listWebhooksExamplePayload = {
  data: [
    {
      gid: "1202700984385446",
      active: true,
      resource: {
        gid: "1202467472002605",
        name: "Brand redesign campaign",
        resource_type: "project",
      },
      resource_type: "webhook",
      target: "https://hooks.example.com/trigger/EXAMPLE",
    },
  ],
};
export const getAttachmentExamplePayload = {
  data: {
    data: {
      gid: "12345",
      resource_type: "attachment",
      name: "Screenshot.png",
      resource_subtype: "dropbox",
      created_at: "2012-02-22T02:06:58.147Z",
      download_url: "https://s3.amazonaws.com/assets/123/Screenshot.png",
      host: "dropbox",
      parent: {
        gid: "12345",
        resource_type: "task",
        name: "Bug Task",
        resource_subtype: "default_task",
      },
      permanent_url: "https://s3.amazonaws.com/assets/123/Screenshot.png",
      view_url: "https://www.dropbox.com/s/123/Screenshot.png",
    },
  },
};
export const deleteAttachmentExamplePayload = { data: { data: {} } };
export const listAttachmentsExamplePayload = {
  data: {
    data: [
      {
        gid: "12345",
        resource_type: "attachment",
        name: "Screenshot.png",
        resource_subtype: "dropbox",
      },
    ],
  },
};
export const attachFileToTaskExamplePayload = {
  data: {
    data: {
      gid: "12345",
      resource_type: "attachment",
      name: "Screenshot.png",
      resource_subtype: "asana",
    },
  },
};
export const createStatusUpdateExamplePayload = {
  data: {
    data: {
      gid: "1202466825616154",
      resource_type: "status_update",
      num_hearts: 0,
      num_likes: 0,
      title: "Example project is going well",
      created_at: "2022-06-17T19:09:58.169Z",
      modified_at: "2022-06-17T19:09:58.169Z",
      status_type: "on_track",
      text: "It'll be completed on time!",
      parent: {
        gid: "1202178854270532",
        resource_type: "project",
        name: "Example Project",
      },
      resource_subtype: "project_status_update",
      hearted: false,
      hearts: [],
      liked: false,
      likes: [],
      created_by: {
        gid: "1202178852626547",
        resource_type: "user",
        name: "Example User",
      },
      html_text: "<body>It'll be completed on time!</body>",
    },
  },
};
export const deleteStatusExamplePayload = { data: { data: {} } };
export const getStatusUpdateExamplePayload = {
  data: {
    data: {
      gid: "1202466832682204",
      created_at: "2022-06-17T19:14:25.512Z",
      created_by: {
        gid: "1202178852626547",
        name: "Example User",
        resource_type: "user",
      },
      modified_at: "2022-06-17T19:14:26.506Z",
      resource_type: "status_update",
      resource_subtype: "project_status_update",
      status_type: "on_track",
      text: "It'll be completed on time!",
      title: "Example project is going well",
      parent: {
        gid: "1202178854270532",
        name: "Example Project",
        resource_type: "project",
      },
    },
  },
};
export const getStatusesForObjectExamplePayload = {
  data: {
    data: [
      {
        gid: "1202466843571433",
        created_at: "2022-06-17T19:22:53.380Z",
        resource_type: "status_update",
        resource_subtype: "project_status_update",
        status_type: "at_risk",
        text: "We accidentally force-pushed over our repo!",
        title: "It's going terribly!",
        parent: {
          gid: "1202178854270532",
          resource_type: "project",
        },
      },
      {
        gid: "1202466947841625",
        created_at: "2022-06-17T19:17:33.744Z",
        resource_type: "status_update",
        resource_subtype: "project_status_update",
        status_type: "on_track",
        text: "It'll be completed on time!",
        title: "Example project is going well",
        parent: {
          gid: "1202178854270532",
          resource_type: "project",
        },
      },
    ],
  },
};
export const getCustomFieldExamplePayload = {
  data: {
    data: {
      gid: "1202467472002610",
      enum_options: [
        {
          gid: "1202467472002611",
          color: "red",
          enabled: true,
          name: "High",
          resource_type: "enum_option",
        },
        {
          gid: "1202467472002612",
          color: "orange",
          enabled: true,
          name: "Medium",
          resource_type: "enum_option",
        },
        {
          gid: "1202467472002613",
          color: "yellow-orange",
          enabled: true,
          name: "Low",
          resource_type: "enum_option",
        },
      ],
      name: "Priority",
      description: "Asana-created. Track the priority of each task.",
      resource_subtype: "enum",
      resource_type: "custom_field",
    },
  },
};
export const listCustomFieldsExamplePayload = {
  data: {
    data: [
      {
        gid: "1202467472002610",
        enum_options: [
          {
            gid: "1202467472002611",
            color: "red",
            enabled: true,
            name: "High",
            resource_type: "enum_option",
          },
          {
            gid: "1202467472002612",
            color: "orange",
            enabled: true,
            name: "Medium",
            resource_type: "enum_option",
          },
          {
            gid: "1202467472002613",
            color: "yellow-orange",
            enabled: true,
            name: "Low",
            resource_type: "enum_option",
          },
        ],
        name: "Priority",
        description: "Asana-created. Track the priority of each task.",
        resource_subtype: "enum",
        resource_type: "custom_field",
      },
      {
        gid: "1202476274909067",
        enum_options: [
          {
            gid: "1202476274909068",
            color: "green",
            enabled: true,
            name: "My First Option",
            resource_type: "enum_option",
          },
          {
            gid: "1202476274909069",
            color: "red",
            enabled: true,
            name: "My Second Option",
            resource_type: "enum_option",
          },
          {
            gid: "1202476274909070",
            color: "orange",
            enabled: true,
            name: "My Third Option",
            resource_type: "enum_option",
          },
        ],
        name: "Do you want these things?",
        description: "",
        resource_subtype: "multi_enum",
        resource_type: "custom_field",
      },
      {
        gid: "1202476390317834",
        name: "Milestone",
        description: "",
        resource_subtype: "text",
        resource_type: "custom_field",
      },
      {
        gid: "1202476390885516",
        name: "Percent Complete",
        description: "",
        precision: 0,
        resource_subtype: "number",
        resource_type: "custom_field",
      },
    ],
  },
};
export const selectPortfolioExamplePayload = {
  result: [{ label: "Example Portfolio", key: "12345" }],
};
export const selectAttachmentExamplePayload = {
  result: [{ label: "Screenshot.png", key: "12345" }],
};
export const selectCustomFieldExamplePayload = {
  result: [{ label: "Priority", key: "1202467472002610" }],
};
