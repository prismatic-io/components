import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { toPaginationParams } from "../../helper";
import { connection, guId, pageNumber, pageSize } from "../../inputs";

export const listDraftTasks = action({
  display: {
    label: "List Draft Tasks",
    description: "List all tasks in a draft project",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.get(`/Projects('${params.guId}')/Draft/Tasks`, {
      params: toPaginationParams(params.pageSize, params.pageNumber),
    });

    return {
      data,
    };
  },
  inputs: { connection, guId, pageSize, pageNumber },
});

export default listDraftTasks;
