import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { createTaskExamplePayload } from "../../examplePayloads";
import { createTaskInputs } from "../../inputs";
import type { TaskObject } from "../types/TaskObject";

export const createTask = action({
  display: {
    label: "Create Task",
    description: "Adds a task to a project list.",
  },
  examplePayload: createTaskExamplePayload,
  perform: async (
    context,
    { connection, projectId, listId, taskName, taskDetails },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    let body = {};
    if (taskDetails.taskObjectBody.length) {
      body = JSON.parse(taskDetails.taskObjectBody) as TaskObject;
    }
    const { data } = await client.put(
      `/projects/${projectId}/lists/${listId}/tasks?taskName=${taskName}
    ${taskDetails.contributors.length ? `&contributors=${taskDetails.contributors}` : ""}
    ${taskDetails.description.length ? `&description=${taskDetails.description}` : ""}
    ${taskDetails.dueDate.length ? `&dueDate=${taskDetails.dueDate}` : ""}
    ${taskDetails.ownedBy.length ? `&ownedBy=${taskDetails.ownedBy}` : ""}
    ${taskDetails.priority.length ? `&priority=${taskDetails.priority}` : ""}
    ${taskDetails.tags.length ? `&tags=${taskDetails.tags}` : ""}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return { data };
  },
  inputs: createTaskInputs,
});

export default { createTask };
