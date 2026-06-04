import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, guId } from "../../inputs";

export const listDraftAssignments = action({
  display: {
    label: "List Draft Assignments",
    description: "List all the assignments in a given draft project",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );

    const { data } = await client.get(`/Projects('${params.guId}')/Draft/Assignments`);

    return {
      data,
    };
  },
  inputs: { connection, guId },
});

export default listDraftAssignments;
