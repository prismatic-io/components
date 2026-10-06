import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { removeTaskFromListExamplePayload } from "../../examplePayloads";
import { removeTaskFromListInputs } from "../../inputs";
export const removeTaskFromList = action({
  display: {
    label: "Remove Task from List",
    description:
      "Remove a task from an additional list. A task cannot be removed from its home list.",
  },
  examplePayload: removeTaskFromListExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { clickUpConnection, listId, taskId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/list/${listId}/task/${taskId}`);
    return {
      data,
    };
  },
  examplePerform: async () => removeTaskFromListExamplePayload,
  inputs: removeTaskFromListInputs,
});
