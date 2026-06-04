import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, draftTaskId, guId } from "../../inputs";

export const getDraftTask = action({
  display: {
    label: "Get Draft Task",
    description: "Get the information or metadata of a task inside a draft project",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/Projects('${params.guId}')/Draft/Tasks('${params.draftTaskId}')`,
    );

    return {
      data,
    };
  },
  inputs: { connection, guId, draftTaskId },
});

export default getDraftTask;
