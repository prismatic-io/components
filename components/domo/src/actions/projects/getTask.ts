import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { getTaskInputs } from "../../inputs";
import { getTaskExamplePayload } from "../../examplePayloads";

export const getTask = action({
  display: {
    label: "Get Task",
    description:
      "Retrieves an individual task from a given project id and list id.",
  },
  examplePayload: getTaskExamplePayload,
  perform: async (context, { connection, listId, projectId, taskId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/projects/${projectId}/lists/${listId}/tasks/${taskId}`,
      {
        headers: { Accept: "application/json" },
      },
    );
    return { data };
  },
  inputs: getTaskInputs,
});

export default { getTask };
