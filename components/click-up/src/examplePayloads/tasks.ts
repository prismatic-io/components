
















const taskObject = {
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
  watchers: [
    {
      id: 81942673,
      username: "John Doe",
      color: "#7b68ee",
      email: "john.doe@example.com",
      initials: "JD",
      profilePicture: null,
    },
  ],
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
  custom_fields: [
    {
      id: "0a52c486-7f05-403c-b4b0-2a1f6dd4b840",
      name: "Sprint",
      type: "drop_down",
      type_config: {
        default: 0,
        placeholder: null,
        options: [
          {
            id: "4aa3b3f7-1a02-4e57-a8cc-0ef8b1a9e07d",
            name: "Sprint 1",
            color: "#04a9f4",
            orderindex: 0,
          },
        ],
      },
      date_created: "1704067200000",
      hide_from_guests: false,
      required: false,
    },
  ],
  dependencies: [],
  linked_tasks: [],
  team_id: "9012345",
  url: "https://app.clickup.com/t/9hx",
  sharing: {
    public: false,
    public_share_expires_on: null,
    whitelisted: [],
    token: null,
  },
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

export const getTaskExamplePayload = {
  data: taskObject,
};

export const listTasksExamplePayload = {
  data: {
    tasks: [taskObject],
  },
};

export const createTaskExamplePayload = {
  data: taskObject,
};

export const updateTaskExamplePayload = {
  data: taskObject,
};

export const deleteTaskExamplePayload = {
  data: null,
};
