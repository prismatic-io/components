import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { createTaskInputs } from "../../inputs";
import type { TaskObject } from "../types/TaskObject";
import { createTaskExamplePayload } from "../../examplePayloads";

export const createTask = action({
  display: {
    label: "Create Task",
    description: "Adds a task to a project list.",
  },
  examplePayload: createTaskExamplePayload,
  perform: async (
    context,
    {
      connection,
      projectId,
      listId,
      taskName,
      contributors,
      description,
      dueDate,
      ownedBy,
      priority,
      tags,
      taskObjectBody,
    },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    let body = {};
    if (taskObjectBody.length) {
      body = JSON.parse(taskObjectBody) as TaskObject;
    }
    const { data } = await client.put(
      `/projects/${projectId}/lists/${listId}/tasks?taskName=${taskName}
    ${contributors.length ? `&contributors=${contributors}` : ""}
    ${description.length ? `&description=${description}` : ""}
    ${dueDate.length ? `&dueDate=${dueDate}` : ""}
    ${ownedBy.length ? `&ownedBy=${ownedBy}` : ""}
    ${priority.length ? `&priority=${priority}` : ""}
    ${tags.length ? `&tags=${tags}` : ""}`,
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
