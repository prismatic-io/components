import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listProjectListTasksInputs } from "../../inputs";
import type { ListProjectListTasksQueryParams } from "../types/ListProjectListTasksQueryParams";
import { listProjectListTasksExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../utils/pagination";

export const listProjectListTasks = action({
  display: {
    label: "List Project List Tasks",
    description: "Retrieves all tasks from a given project list.",
  },
  examplePayload: listProjectListTasksExamplePayload,
  perform: async (
    context,
    { connection, projectId, listId, limit, offset, fetchAll },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListProjectListTasksQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;
    return paginateResults(
      client,
      `/projects/${projectId}/lists/${listId}/tasks`,
      fetchAll,
      queryParams as Record<string, string>,
    );
  },
  inputs: listProjectListTasksInputs,
});

export default { listProjectListTasks };
