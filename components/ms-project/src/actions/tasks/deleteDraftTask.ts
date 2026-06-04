import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, draftTaskId, guId } from "../../inputs";

export const deleteDraftTask = action({
  display: {
    label: "Delete Draft Task",
    description: "Delete an existing task from a draft project",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.delete(
      `/Projects('${params.guId}')/Draft/Tasks('${params.draftTaskId}')`,
    );

    return {
      data,
    };
  },
  inputs: { connection, guId, draftTaskId },
});

export default deleteDraftTask;
