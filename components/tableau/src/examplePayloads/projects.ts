const projectObject = {
  id: "1f2f3e4e-5d6d-7c8c-9b0b-1a2a3f4f5e6e",
  name: "Marketing Analytics",
  description: "Dashboards and reports for the marketing team",
  contentPermissions: "ManagedByOwner",
  controllingPermissionsProjectId: "1f2f3e4e-5d6d-7c8c-9b0b-1a2a3f4f5e6e",
  topLevelProject: "true",
  createdAt: "2024-03-15T14:22:31Z",
  updatedAt: "2024-06-10T09:45:12Z",
  owner: {
    id: "abc12e4e-5d6d-7c8c-9b0b-1a2a3f4f5e90",
  },
  contentCounts: {
    projectCount: "2",
    workbookCount: "8",
    viewCount: "24",
    datasourceCount: "3",
  },
};

export const listProjectsExamplePayload = {
  data: {
    pagination: {
      pageNumber: "1",
      pageSize: "100",
      totalAvailable: "12",
    },
    projects: {
      project: [projectObject],
    },
  },
};

export const searchProjectsExamplePayload = listProjectsExamplePayload;

export const getProjectExamplePayload = listProjectsExamplePayload;

export const createProjectExamplePayload = {
  data: {
    project: projectObject,
  },
};

export const updateProjectExamplePayload = createProjectExamplePayload;

export const deleteProjectsExamplePayload = {
  data: null,
};
