















const folderObject = {
  id: "457",
  name: "Website Redesign",
  orderindex: 0,
  override_statuses: false,
  hidden: false,
  space: {
    id: "790",
    name: "Engineering",
    access: true,
  },
  task_count: "12",
  archived: false,
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
  lists: [
    {
      id: "124",
      name: "Sprint Backlog",
      orderindex: 0,
      status: null,
      priority: null,
      assignee: null,
      task_count: 8,
      due_date: null,
      start_date: null,
      space: {
        id: "790",
        name: "Engineering",
        access: true,
      },
      archived: false,
      override_statuses: null,
      statuses: [
        {
          status: "to do",
          orderindex: 0,
          color: "#d3d3d3",
          type: "open",
        },
        {
          status: "complete",
          orderindex: 1,
          color: "#6bc950",
          type: "closed",
        },
      ],
      permission_level: "create",
    },
  ],
  permission_level: "create",
};

export const getFolderExamplePayload = {
  data: folderObject,
};

export const listFoldersExamplePayload = {
  data: {
    folders: [folderObject],
  },
};

export const createFolderExamplePayload = {
  data: folderObject,
};

export const updateFolderExamplePayload = {
  data: folderObject,
};

export const deleteFolderExamplePayload = {
  data: null,
};
