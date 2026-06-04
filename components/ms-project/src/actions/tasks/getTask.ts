import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, guId, taskId } from "../../inputs";

export const getTask = action({
  display: {
    label: "Get Task",
    description: "Get the information and metadata of a task by Id",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );

    const { data } = await client.get(`/Projects('${params.guId}')/Tasks("${params.taskId}")`);

    return {
      data,
    };
  },
  inputs: { connection, guId, taskId },
});

export default getTask;
