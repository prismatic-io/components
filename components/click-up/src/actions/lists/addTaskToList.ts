import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { addTaskToListExamplePayload } from "../../examplePayloads";
import { addTaskToListInputs } from "../../inputs";
export const addTaskToList = action({
  display: {
    label: "Add Task to List",
    description: "Add a task to an additional list.",
  },
  examplePayload: addTaskToListExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { clickUpConnection, listId, taskId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/list/${listId}/task/${taskId}`);
    return {
      data,
    };
  },
  examplePerform: async () => addTaskToListExamplePayload,
  inputs: addTaskToListInputs,
});
