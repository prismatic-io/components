import { dataSource, input } from "@prismatic-io/spectral";
import type { ListProjectListTasksQueryParams } from "../actions/types/ListProjectListTasksQueryParams";
import { getDomoClient } from "../client";
import { connection, limit, listId, offset, projectId } from "../inputs";

const projects = dataSource({
  display: {
    label: "Select Project",
    description: "Selects a Domo project.",
  },
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const client = await getDomoClient(connection, false);
    const { data } = await client.get(`/projects`, {
      headers: { Accept: "application/json" },
    });
    return {
      result: data.map((project: Record<string, string>) => ({
        label: project.name,
        key: String(project.id),
      })),
    };
  },
  inputs: {
    connection,
  },
});

const projectLists = dataSource({
  display: {
    label: "Select Project List",
    description: "Selects a Domo project list.",
  },
  dataSourceType: "picklist",
  perform: async (_context, { connection, projectId }) => {
    const client = await getDomoClient(connection, false);
    const { data } = await client.get(`/projects/${projectId}/lists`, {
      headers: { Accept: "application/json" },
    });
    return {
      result: data.map((projectList: Record<string, string>) => ({
        label: projectList.name,
        key: String(projectList.id),
      })),
    };
  },
  inputs: {
    connection,
    projectId: {
      ...projectId,
      dataSource: undefined,
    },
  },
});

const selectTask = dataSource({
  display: {
    label: "Select Task",
    description: "Selects a Domo project task.",
  },
  dataSourceType: "picklist",
  perform: async (
    _context,
    { connection, projectId, listId, limit, offset },
  ) => {
    const client = await getDomoClient(connection, false);
    const queryParams: ListProjectListTasksQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;
    const { data } = await client.get(
      `/projects/${projectId}/lists/${listId}/tasks`,
      {
        params: queryParams,
        headers: { Accept: "application/json" },
      },
    );
    return {
      result: data.map((task: Record<string, string | number>) => ({
        label: task.taskName || String(task.id),
        key: String(task.id),
      })),
    };
  },
  inputs: {
    connection,
    projectId: {
      ...projectId,
      dataSource: undefined,
    },
    listId: {
      ...listId,
      dataSource: undefined,
    },
    limit: input({
      ...limit,
      required: false,
      comments:
        "The number of tasks to return in the list. The default is 10 and the maximum is 50.",
    }),
    offset: input({
      ...offset,
      required: false,
      comments: "The offset of tasks to begin the list within the response.",
    }),
  },
});

export default { projects, projectLists, selectTask };
