import { action, util } from "@prismatic-io/spectral";
import { getTableuClient } from "../auth";
import {
  timeout,
  projectId,
  contentPermissions,
  description,
  parentProjectId,
  projectName,
  pageNumber,
  pageSize,
  connectionInput,
  projectSearchField,
  searchString,
} from "../inputs";
import {
  listProjectsExamplePayload,
  searchProjectsExamplePayload,
  getProjectExamplePayload,
  deleteProjectsExamplePayload,
  createProjectExamplePayload,
  updateProjectExamplePayload,
} from "../examplePayloads";

export const listProjects = action({
  display: {
    label: "List Projects",
    description: "Retrieve a list of projects connected to your Tableau site",
  },
  examplePayload: listProjectsExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get("/projects", {
      params: {
        pageSize: util.types.toNumber(params.pageSize) || undefined,
        pageNumber: util.types.toNumber(params.pageNumber) || undefined,
      },
    });

    return {
      data: response.data,
    };
  },
  inputs: {
    timeout,
    pageSize,
    pageNumber,
    tableauConnection: connectionInput,
  },
});

export const searchProjects = action({
  display: {
    label: "Search Projects",
    description: "Search for a specific project by a string of text",
  },
  examplePayload: searchProjectsExamplePayload,
  perform: async (context, params) => {
    const searchString = util.types.toString(params.searchString);
    const searchField = util.types.toString(params.searchField);
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get(`/projects`, {
      params: {
        pageSize: util.types.toNumber(params.pageSize) || undefined,
        pageNumber: util.types.toNumber(params.pageNumber) || undefined,
        filter: `${searchField}:eq:${searchString}`,
      },
    });

    return {
      data: response.data,
    };
  },
  inputs: {
    searchString,
    searchField: projectSearchField,
    timeout,
    tableauConnection: connectionInput,
    pageNumber,
    pageSize,
  },
});

export const getProject = action({
  display: {
    label: "Get Project",
    description: "Get an existing project",
  },
  examplePayload: getProjectExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get(`/projects`, {
      params: {
        filter: `name:eq:${params.projectName}`,
      },
    });

    return {
      data: response.data,
    };
  },
  inputs: { projectName, timeout, tableauConnection: connectionInput },
});

export const deleteProjects = action({
  display: {
    label: "Delete Projects",
    description: "Delete an existing project by Id",
  },
  examplePayload: deleteProjectsExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.delete(`/projects/${params.projectId}`);

    return {
      data: response.data,
    };
  },
  inputs: { projectId, timeout, tableauConnection: connectionInput },
});

export const createProject = action({
  display: {
    label: "Create Project",
    description: "Create a new project inside your Tableau site",
  },
  examplePayload: createProjectExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.post(`/projects`, {
      project: {
        parentProjectId: params.parentProjectId || undefined,
        name: params.projectName,
        description: params.description || undefined,
        contentPermissions: params.contentPermissions || undefined,
      },
    });

    return {
      data: response.data,
    };
  },
  inputs: {
    parentProjectId,
    projectName,
    contentPermissions,
    description,
    timeout,
    tableauConnection: connectionInput,
  },
});

export const updateProject = action({
  display: {
    label: "Update Project",
    description:
      "Update the contents and metadata of an existing project by Id",
  },
  examplePayload: updateProjectExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.put(`/projects/${params.projectId}`, {
      project: {
        parentProjectId: params.parentProjectId || undefined,
        name: params.projectName || undefined,
        description: params.description || undefined,
        contentPermissions: params.contentPermissions || undefined,
      },
    });

    return {
      data: response.data,
    };
  },
  inputs: {
    projectId,
    parentProjectId,
    projectName: { ...projectName, required: false },
    contentPermissions,
    description,
    timeout,
    tableauConnection: connectionInput,
  },
});
