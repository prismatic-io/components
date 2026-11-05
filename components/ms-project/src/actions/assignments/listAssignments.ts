import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { toPaginationParams } from "../../helper";
import { connection, guId, pageNumber, pageSize } from "../../inputs";

export const listAssignments = action({
  display: {
    label: "List Assignments",
    description: "List all the assignments in a given project",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );

    const { data } = await client.get(`/Projects('${params.guId}')/Assignments`, {
      params: toPaginationParams(params.pageSize, params.pageNumber),
    });

    return {
      data,
    };
  },
  inputs: { connection, guId, pageSize, pageNumber },
});

export default listAssignments;
