import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { listOpenTasksExamplePayload } from "../../examplePayloads";
import { listOpenTasksInputs } from "../../inputs";

export const listOpenTasks = action({
  display: {
    label: "List Open Tasks",
    description: "Retrieves a list of all open tasks in the system.",
  },
  perform: async (context, { connection }) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.get("/tasks");
    return {
      data,
    };
  },
  inputs: listOpenTasksInputs,
  examplePayload: listOpenTasksExamplePayload,
});
