
























export const getProjectExamplePayload = {
  data: {
    id: 7,
    name: "Q2 Data Integration Initiative",
    description: "Integrate new data sources for Q2 reporting",
    dueDate: "2024-06-30",
    public: false,
    createdDate: "2024-01-20",
    members: [87264918, 54320910, 66011234],
  },
};

export const listProjectsExamplePayload = {
  data: [
    getProjectExamplePayload.data,
    {
      id: 8,
      name: "Customer 360 Rebuild",
      description: "Rebuild the customer 360 dashboard with new data pipelines",
      dueDate: "2024-09-15",
      public: true,
      createdDate: "2024-02-05",
      members: [87264918, 72980045],
    },
  ],
};

export const createProjectExamplePayload = getProjectExamplePayload;

export const updateProjectExamplePayload = {
  data: {
    ...getProjectExamplePayload.data,
    name: "Q2 Data Integration Initiative (Updated)",
    dueDate: "2024-07-15",
  },
};

export const deleteProjectExamplePayload = { data: null };

export const getProjectMembersExamplePayload = {
  data: [87264918, 54320910, 66011234],
};

export const updateProjectMembersExamplePayload = { data: null };



export const getListExamplePayload = {
  data: {
    id: 101,
    name: "To Do",
    type: "TODO",
    index: 0,
    projectId: 7,
  },
};

export const listProjectListsExamplePayload = {
  data: [
    getListExamplePayload.data,
    {
      id: 102,
      name: "In Progress",
      type: "ACTIVE",
      index: 1,
      projectId: 7,
    },
    {
      id: 103,
      name: "Done",
      type: "DONE",
      index: 2,
      projectId: 7,
    },
  ],
};

export const createListExamplePayload = getListExamplePayload;

export const updateListExamplePayload = {
  data: {
    ...getListExamplePayload.data,
    name: "Backlog",
    index: 0,
  },
};

export const deleteListExamplePayload = { data: null };



export const getTaskExamplePayload = {
  data: {
    id: 2001,
    taskName: "Connect Salesforce data source",
    description:
      "Configure the Salesforce connector and map fields to the schema",
    dueDate: "2024-05-15",
    ownedBy: 87264918,
    contributors: [54320910],
    priority: "HIGH",
    tags: ["salesforce", "etl"],
    projectId: 7,
    listId: 101,
    attachmentCount: 1,
    createdDate: "2024-02-01",
    lastModified: "2024-03-22",
  },
};

export const listProjectListTasksExamplePayload = {
  data: [
    getTaskExamplePayload.data,
    {
      id: 2002,
      taskName: "Write DataSet transformation SQL",
      description: "Write the SQL transformations for the new DataSet",
      dueDate: "2024-05-20",
      ownedBy: 54320910,
      contributors: [87264918],
      priority: "MEDIUM",
      tags: ["sql", "dataset"],
      projectId: 7,
      listId: 101,
      attachmentCount: 0,
      createdDate: "2024-02-03",
      lastModified: "2024-03-18",
    },
  ],
};

export const createTaskExamplePayload = getTaskExamplePayload;

export const updateTaskExamplePayload = {
  data: {
    ...getTaskExamplePayload.data,
    taskName: "Connect Salesforce data source (Updated)",
    priority: "CRITICAL",
    lastModified: "2024-04-01",
  },
};
