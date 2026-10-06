const guestUser = {
  id: 40237592,
  username: "External Reviewer",
  email: "reviewer@partner-company.com",
  color: "#e91e63",
  profilePicture: null,
  initials: "ER",
  role: 4,
  last_active: null,
  date_joined: null,
  date_invited: "1704067200000",
};
const workspaceGuestUser = {
  ...guestUser,
  custom_role: {
    id: 12345,
    name: "External Reviewer",
  },
};
const invitedByObject = {
  id: 81942670,
  username: "Jane Smith",
  color: "#e91e63",
  email: "jane.smith@example.com",
  initials: "JS",
  profilePicture:
    "https://attachments.clickup.com/profilePictures/81942670_def.jpg",
};
const guestPermissions = {
  can_edit_tags: true,
  can_see_time_spent: true,
  can_see_time_estimated: true,
};
const workspaceGuestPermissions = {
  ...guestPermissions,
  can_create_views: false,
  can_see_points_estimated: false,
};
const guestObject = {
  guest: {
    user: guestUser,
    invited_by: invitedByObject,
    ...guestPermissions,
    shared: {
      tasks: [],
      lists: [],
      folders: [],
    },
  },
};
const workspaceGuestObject = {
  guest: {
    user: workspaceGuestUser,
    invited_by: invitedByObject,
    ...workspaceGuestPermissions,
    shared: {
      tasks: [],
      lists: [],
      folders: [],
    },
  },
};
const sharedTask = {
  id: "9hx",
  name: "Design Homepage",
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
  archived: false,
  creator: {
    id: 81942673,
    username: "John Doe",
    color: "#7b68ee",
    email: "john.doe@example.com",
    profilePicture:
      "https://attachments.clickup.com/profilePictures/81942673_abc.jpg",
  },
  assignees: [],
  checklists: [],
  tags: [],
  parent: null,
  priority: {
    id: "2",
    priority: "high",
    color: "#ffcc00",
    orderindex: "2",
  },
  due_date: "1704326400000",
  start_date: null,
  points: null,
  time_estimate: null,
  custom_fields: [],
  dependencies: [],
  team_id: "9012345",
  url: "https://app.clickup.com/t/9hx",
  permission_level: "read",
  list: { id: "124", name: "Sprint Backlog", access: false },
  folder: { id: "457", name: "Website Redesign", hidden: false, access: false },
  space: { id: "790" },
};
const sharedListStatuses = [
  {
    id: "p90110061901_BEV3ofnq",
    status: "to do",
    orderindex: 0,
    color: "#d3d3d3",
    type: "open",
  },
  {
    id: "p90110061901_kzdLxYc9",
    status: "complete",
    orderindex: 1,
    color: "#6bc950",
    type: "closed",
  },
];
const sharedList = {
  id: "124",
  name: "Sprint Backlog",
  orderindex: 0,
  status: null,
  priority: null,
  assignee: null,
  task_count: "8",
  due_date: null,
  start_date: null,
  archived: false,
  override_statuses: false,
  statuses: sharedListStatuses,
  permission_level: "read",
};
const sharedFolder = {
  id: "457",
  name: "Website Redesign",
  orderindex: 0,
  override_statuses: false,
  hidden: false,
  task_count: "12",
  archived: false,
  statuses: sharedListStatuses,
  lists: [],
  permission_level: "read",
};
export const getGuestExamplePayload = {
  data: workspaceGuestObject,
};
export const inviteGuestToWorkspaceExamplePayload = {
  data: {
    team: {
      id: "9012345",
      name: "Acme Corp Workspace",
      color: "#536cfe",
      avatar: null,
      members: [
        {
          user: workspaceGuestUser,
          invited_by: invitedByObject,
          ...workspaceGuestPermissions,
        },
      ],
      roles: [
        { id: 1, name: "owner", custom: false },
        { id: 2, name: "admin", custom: false },
        { id: 3, name: "member", custom: false },
        { id: 4, name: "guest", custom: false },
      ],
    },
  },
};
export const editGuestOnWorkspaceExamplePayload = {
  data: workspaceGuestObject,
};
export const removeGuestFromWorkspaceExamplePayload = {
  data: {
    team: {
      id: "9012345",
      name: "Acme Corp Workspace",
      color: "#536cfe",
      avatar: null,
      members: [],
    },
  },
};
export const addGuestToTaskExamplePayload = {
  data: {
    guest: {
      ...guestObject.guest,
      shared: { tasks: [sharedTask], lists: [], folders: [] },
    },
  },
};
export const removeGuestFromTaskExamplePayload = {
  data: guestObject,
};
export const addGuestToListExamplePayload = {
  data: {
    guest: {
      ...guestObject.guest,
      shared: { tasks: [], lists: [sharedList], folders: [] },
    },
  },
};
export const removeGuestFromListExamplePayload = {
  data: guestObject,
};
export const addGuestToFolderExamplePayload = {
  data: {
    guest: {
      ...guestObject.guest,
      shared: { tasks: [], lists: [], folders: [sharedFolder] },
    },
  },
};
export const removeGuestFromFolderExamplePayload = {
  data: guestObject,
};
