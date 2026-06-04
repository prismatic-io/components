



















const listObject = {
  id: "124",
  name: "Sprint Backlog",
  orderindex: 0,
  content: "Tasks for the current sprint cycle.",
  status: {
    status: "active",
    color: "#87909e",
    hide_label: true,
  },
  priority: {
    priority: "high",
    color: "#ffcc00",
  },
  assignee: null,
  task_count: 8,
  due_date: "1706745600000",
  due_date_time: false,
  start_date: "1704067200000",
  start_date_time: false,
  folder: {
    id: "457",
    name: "Website Redesign",
    hidden: false,
    access: true,
  },
  space: {
    id: "790",
    name: "Engineering",
    access: true,
  },
  statuses: [
    {
      status: "to do",
      orderindex: 0,
      color: "#d3d3d3",
      type: "open",
    },
    {
      status: "in progress",
      orderindex: 1,
      color: "#4194f6",
      type: "custom",
    },
    {
      status: "complete",
      orderindex: 2,
      color: "#6bc950",
      type: "closed",
    },
  ],
  inbound_address: "add.task.124.U-81942673.ccc7c26e-3ab9-46d5-ad07-62a9a7d0f0c4@tasks.clickup.com",
  archived: false,
  permission_level: "create",
};

export const getListExamplePayload = {
  data: listObject,
};

export const getListsExamplePayload = {
  data: {
    lists: [listObject],
  },
};

export const createListExamplePayload = {
  data: listObject,
};

export const updateListExamplePayload = {
  data: listObject,
};

export const deleteListExamplePayload = {
  data: null,
};

export const addTaskToListExamplePayload = {
  data: null,
};

export const removeTaskFromListExamplePayload = {
  data: null,
};
