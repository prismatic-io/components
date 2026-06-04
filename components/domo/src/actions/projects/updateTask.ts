import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { updateTaskInputs } from "../../inputs";
import type { UpdateTaskBody } from "../types/UpdateTaskBody";
import type { UpdateTaskQueryParams } from "../types/UpdateTaskQueryParams";
import { updateTaskExamplePayload } from "../../examplePayloads";

export const updateTask = action({
  display: {
    label: "Update Task",
    description: "Updates the details of a task within a project list.",
  },
  examplePayload: updateTaskExamplePayload,
  perform: async (
    context,
    {
      connection,
      taskId,
      listId,
      projectId,
      contributors,
      description,
      dueDate,
      ownedBy,
      priority,
      tags,
      taskName,
      updateTaskBody,
    },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: UpdateTaskQueryParams = {};
    if (contributors.length) queryParams.contributors = contributors;
    if (description.length) queryParams.description = description;
    if (dueDate.length) queryParams.dueDate = dueDate;
    if (ownedBy.length) queryParams.ownedBy = ownedBy;
    if (priority.length) queryParams.priority = priority;
    if (tags.length) queryParams.tags = tags;
    if (taskName.length) queryParams.taskName = taskName;
    let body = {};
    if (updateTaskBody.length)
      body = JSON.parse(updateTaskBody) as UpdateTaskBody;
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
