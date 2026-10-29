import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { updateTaskExamplePayload } from "../../examplePayloads";
import { updateTaskInputs } from "../../inputs";
import type { UpdateTaskBody } from "../types/UpdateTaskBody";
import type { UpdateTaskQueryParams } from "../types/UpdateTaskQueryParams";

export const updateTask = action({
  display: {
    label: "Update Task",
    description: "Updates the details of a task within a project list.",
  },
  examplePayload: updateTaskExamplePayload,
  perform: async (
    context,
    { connection, taskId, listId, projectId, taskName, taskDetails },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: UpdateTaskQueryParams = {};
    if (taskDetails.contributors.length)
      queryParams.contributors = taskDetails.contributors;
    if (taskDetails.description.length)
      queryParams.description = taskDetails.description;
    if (taskDetails.dueDate.length) queryParams.dueDate = taskDetails.dueDate;
    if (taskDetails.ownedBy.length) queryParams.ownedBy = taskDetails.ownedBy;
    if (taskDetails.priority.length)
      queryParams.priority = taskDetails.priority;
    if (taskDetails.tags.length) queryParams.tags = taskDetails.tags;
    if (taskName.length) queryParams.taskName = taskName;
    let body = {};
    if (taskDetails.updateTaskBody.length)
      body = JSON.parse(taskDetails.updateTaskBody) as UpdateTaskBody;
    const { data } = await client.put(
      `/projects/${projectId}/lists/${listId}/tasks/${taskId}`,
      body,
      {
        params: queryParams,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return { data };
  },
  inputs: updateTaskInputs,
});

export default { updateTask };
