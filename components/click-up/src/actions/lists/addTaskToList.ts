import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { addTaskToListExamplePayload } from "../../examplePayloads";
import { connectionInput, getlistId, getTaskId } from "../../inputs";

const listId = getlistId(true, "List ID");
const taskId = getTaskId(true, "Task ID");

export const addTaskToList = action({
  display: {
    label: "Add Task to List",
    description: "Add a task to an additional list.",
  },
  examplePayload: addTaskToListExamplePayload,
  perform: async (context, { clickUpConnection, listId, taskId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.post(`/list/${listId}/task/${taskId}`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    listId,
    taskId,
  },
});
