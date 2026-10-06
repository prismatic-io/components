const viewDefaults = {
  parent: {
    id: "790",
    type: 4,
  },
  grouping: {
    field: "status",
    dir: 1,
    collapsed: [],
    ignore: false,
  },
  divide: {
    field: null,
    dir: null,
    collapsed: [],
  },
  sorting: {
    fields: [],
  },
  filters: {
    op: "AND",
    fields: [],
    search: "",
    show_closed: false,
  },
  columns: {
    fields: [],
  },
  team_sidebar: {
    assignees: [],
    assigned_comments: false,
    unassigned_tasks: false,
  },
  settings: {
    show_task_locations: false,
    show_subtasks: 3,
    show_subtask_parent_names: false,
    show_closed_subtasks: false,
    show_assignees: true,
    show_images: true,
    collapse_empty_columns: null,
    me_comments: true,
    me_subtasks: true,
    me_checklists: true,
  },
};
export const getSpaceViewsResponseFixture = {
  views: [
    {
      id: "3c-107",
      name: "Sprint Calendar",
      type: "calendar",
      ...viewDefaults,
    },
    {
      id: "3c-106",
      name: "Engineering Board",
      type: "board",
      ...viewDefaults,
    },
  ],
};
export const teamsExamplePayload = {
  result: [
    { label: "Acme Corp Workspace", key: "9012345" },
    { label: "Acme Labs", key: "9012346" },
  ],
};
export const spacesExamplePayload = {
  result: [
    { label: "Engineering", key: "790" },
    { label: "Marketing", key: "791" },
  ],
};
export const foldersExamplePayload = {
  result: [
    { label: "Q3 Roadmap", key: "457" },
    { label: "Backlog", key: "458" },
  ],
};
export const listsExamplePayload = {
  result: [
    { label: "Sprint 12", key: "124" },
    { label: "Bugs", key: "125" },
  ],
};
export const customFieldsExamplePayload = {
  result: [
    { label: "Sprint", key: "0a52c486-7f05-403c-b4b0-2a1f6dd4b840" },
    { label: "Story Points", key: "1b63d597-8a16-414d-a5c1-3b2e7ee5c951" },
  ],
};
export const customFieldOptionsExamplePayload = {
  result: [
    { label: "Sprint 12", key: "a1b2c3d4-0001-4000-8000-000000000001" },
    { label: "Sprint 13", key: "a1b2c3d4-0001-4000-8000-000000000002" },
  ],
};
export const tasksExamplePayload = {
  result: [
    { label: "Implement OAuth login", key: "9hz" },
    { label: "Fix pagination bug", key: "9i0" },
  ],
};
export const calendarsExamplePayload = {
  result: [{ label: "Sprint Calendar", key: "3c-107" }],
};
