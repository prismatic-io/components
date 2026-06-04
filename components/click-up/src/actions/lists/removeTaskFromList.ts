import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { removeTaskFromListExamplePayload } from "../../examplePayloads";
import { connectionInput, getlistId, getTaskId } from "../../inputs";

const listId = getlistId(true, "List ID");
const taskId = getTaskId(true, "Task ID");

export const removeTaskFromList = action({
  display: {
    label: "Remove Task from List",
    description: "Remove a task from an additional list. A task cannot be removed from its home list.",
  },
  examplePayload: removeTaskFromListExamplePayload,
  perform: async (context, { clickUpConnection, listId, taskId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.delete(`/list/${listId}/task/${taskId}`);

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
