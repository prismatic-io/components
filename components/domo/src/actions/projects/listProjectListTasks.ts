import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listProjectListTasksExamplePayload } from "../../examplePayloads";
import { listProjectListTasksInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
import type { ListProjectListTasksQueryParams } from "../types/ListProjectListTasksQueryParams";

export const listProjectListTasks = action({
  display: {
    label: "List Project List Tasks",
    description: "Retrieves all tasks from a given project list.",
  },
  examplePayload: listProjectListTasksExamplePayload,
  perform: async (
    context,
    { connection, projectId, listId, pagination, fetchAll },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListProjectListTasksQueryParams = {};
    if (pagination.limit.length) queryParams.limit = pagination.limit;
    if (pagination.offset.length) queryParams.offset = pagination.offset;
    return await paginateResults(
      client,
      `/projects/${projectId}/lists/${listId}/tasks`,
      fetchAll,
      queryParams as Record<string, string>,
    );
  },
  inputs: listProjectListTasksInputs,
});

export default { listProjectListTasks };
